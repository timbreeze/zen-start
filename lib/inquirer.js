const inquirer = require("inquirer");

module.exports = {
  askProjectDetails: () => {
    const questions = [
      {
        name: "directory",
        type: "input",
        message: "Enter a name for the directory:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a name for your directory.";
          }
        },
      },
      {
        name: "name",
        type: "input",
        message: "Enter a name for your project:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a name for your project.";
          }
        },
      },
      {
        name: "repositoryURL",
        type: "input",
        message: "Enter the GitLab URL for your project:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a URL for your project.";
          }
        },
      },
      {
        name: "alias",
        type: "input",
        message: "Enter an Alias for the .env file:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter an ALIAS.";
          }
        },
      },
      {
        name: "project",
        type: "input",
        message: "Enter the CMS project for the .env file:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a CMS Project.";
          }
        },
      },
      {
        name: "accessToken",
        type: "input",
        message: "Enter the CMS Access Token for the .env file:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter the Access Token for your chosen CMS.";
          }
        },
      },
      {
        name: "publicURL",
        type: "input",
        message: "Enter the Public URL for the .env file:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter the Public URL for this project.";
          }
        },
      },
      // {
      //   name: "baseVersion",
      //   type: "list",
      //   choices: ["latest", "prerelease"],
      //   message:
      //     "Enter the version of Contensis React Base you wish to install:",
      //   validate: function (value) {
      //     if (value.length) {
      //       return true;
      //     } else {
      //       return "Please select a version.";
      //     }
      //   },
      // },
      {
        name: "forms",
        type: "confirm",
        message: "Does this project need Forms?",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please provide an answer.";
          }
        },
      },
      {
        name: "psComponents",
        type: "confirm",
        message: "Do you want to install the PS Component Library?",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please provide an answer.";
          }
        },
      },
      {
        name: "composer",
        type: "confirm",
        message: "Does this project need a Composer?",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please provide an answer.";
          }
        },
      },
      {
        name: "search",
        type: "confirm",
        message: "Does this project need Search? Listing, MiniList, etc.",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please provide an answer.";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
