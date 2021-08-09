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
          { name: "Address", value: "Address" },
          { name: "City", value: "City" },
          { name: "Gender", value: "Gender" },
          { name: "Email", value: "Email" },
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
};
