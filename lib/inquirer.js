const inquirer = require("inquirer");

const { EXIT, SEARCH, VIEW_ALL } = require("./constants");

module.exports = {
  askInitialQuestion: () => {
    const questions = [
      {
        name: "initial",
        type: "list",
        message: "What would you like to do?",
        choices: [
          { name: "View all people", value: VIEW_ALL },
          { name: "Search people", value: SEARCH },
          { name: "Exit", value: EXIT },
        ],
      },
    ];
    return inquirer.prompt(questions);
  },
  filterByQuestion: () => {
    const questions = [
      {
        name: "filterBy",
        type: "list",
        message: "What would you like to search by?",
        choices: [
          { name: "UserName", value: "UserName" },
          { name: "FirstName", value: "FirstName" },
          { name: "LastName", value: "LastName" },
          { name: "Gender", value: "Gender" },
        ],
      },
    ];

    return inquirer.prompt(questions).then((answers) => {
      return inquirer
        .prompt({
          name: "filterValue",
          type: "input",
          message: "Value for " + answers.filterBy,
        })
        .then((promptVal) => Object.assign({}, answers, promptVal));
    });
  },
  listPeople: (people) => {
    const questions = [
      {
        name: "displayPerson",
        type: "list",
        message: "Select a person",
        choices: people.map((person) => ({
          name: `@${person.UserName} - ${person.FirstName} ${person.LastName}`,
          value: person,
        })),
      },
    ];

    return inquirer.prompt(questions);
  },
};
