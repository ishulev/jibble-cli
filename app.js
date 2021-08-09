const process = require("process");
const Spinner = require("clui").Spinner;

const {
  askInitialQuestion,
  filterByQuestion,
  listPeople,
} = require("./lib/inquirer");
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

// function displayAllPeople() {
//   console.table(people, ["UserName", "FirstName", "LastName"]);
// }

async function getAllPeople() {
  spinner.start();
  try {
    const response = await getPeople();
    spinner.stop();

    if (response.hasOwnProperty("value")) {
      people = response.value;
    } else {
      console.error("Response from server is not in expected format.");
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
}

function viewSelectedPerson({ displayPerson }) {
  console.log(displayPerson);
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
        const response = await filterPeople(
          filterVal.filterBy,
          filterVal.filterValue
        );
        spinner.stop();
        if (response.value && response.value.length) {
          viewSelectedPerson(await listPeople(response.value));
        } else {
          console.log("No people found!");
        }
      } catch (error) {
        console.error(error);
      }
      break;
    case VIEW_ALL:
      await getAllPeople();
      if (people.length) {
        viewSelectedPerson(await listPeople(people));
      }
      break;
    default:
      process.exit(1);
  }
  console.log("-".repeat(10), "\n".repeat(3));
  run();
};

run();
