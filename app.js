const process = require("process");
const Spinner = require("clui").Spinner;

const { askInitialQuestion, filterByQuestion } = require("./lib/inquirer");
const { EXIT, SEARCH, VIEW_ALL } = require("./lib/constants");
const { getPeople, filterPeople } = require("./lib/query");

let people = [];
const spinner = new Spinner("Fetching people...  ", [
  "⣾",
  "⣽",
  "⣻",
  "⢿",
  "⡿",
  "⣟",
  "⣯",
  "⣷",
]);

function displayAllPeople() {
  console.table(people, ["UserName", "FirstName", "LastName"]);
}

async function getAllPeople() {
  spinner.start();
  try {
    const response = await getPeople();
    spinner.stop();

    if (response.hasOwnProperty("value")) {
      people = response.value;
      displayAllPeople();
    } else {
      console.error("Response from server is not in expected format.");
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
}

const run = async () => {
  const { initial } = await askInitialQuestion();
  switch (initial) {
    case EXIT:
      process.exit(1);
    case SEARCH:
      const filterVal = await filterByQuestion();
      spinner.start();
      try {
          const filteredPeople = await filterPeople(
            filterVal.filterBy,
            filterVal.filterValue
          );
          
      } catch (error) {
          console.error(error)
      }
      spinner.stop();
      break;
    case VIEW_ALL:
      if (people.length) {
        displayAllPeople();
      } else {
        await getAllPeople();
      }
      run();
      break;
    default:
      process.exit(1);
  }
};

run();
