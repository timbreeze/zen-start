#!/usr/bin/env node

const { program } = require("commander");

const fs = require("fs");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./lib/inquirer");
const simpleGit = require("simple-git");
const git = simpleGit();
const { exec } = require("child_process");

const defaultRepo = "git@github.com:timbreeze/zen-start-tester.git";

clear();

console.log(
  chalk.redBright(figlet.textSync("Zen-Start", { horizontalLayout: "full" }))
);

const run = async () => {
  const project = await inquirer.askProjectDetails();

  const setPackage = async () => {
    const package = `./${project.directory}/package.json`;
    const file = require(package);

    const packageName = async () => {
      console.log(chalk.yellow(`Writing ${project.name} to package.json...`));

      file.name = project.name;

      fs.writeFileSync(package, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
      });
      // console.log(
      //   chalk.bgGreen(`Successfully wrote ${project.name} to package.json!`)
      // );
    };

    const packageRepositoryURL = async () => {
      console.log(
        chalk.yellow(`Writing ${project.repositoryURL} to package.json...`)
      );

      file.repository = project.repositoryURL;

      fs.writeFileSync(package, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
      });
      // console.log(
      //   chalk.bgGreen(
      //     `Successfully wrote ${project.repositoryURL} to package.json!`
      //   )
      // );
    };

    packageName().then(packageRepositoryURL());
  };

  const setENV = async () => {
    console.log(chalk.yellow(`Writing .env file...`));

    const envPath = `./${project.directory}/.env`;
    const envFormat = `ALIAS=${project.alias}\nPROJECT=${project.project}\nACCESS_TOKEN=${project.accessToken}\nPUBLIC_URL=${project.publicURL}`;

    fs.writeFile(envPath, envFormat, function writeJSON(err) {
      if (err) return console.log(err);
    });

    // console.log(chalk.bgGreen(`Successfully wrote to .env file!`));
  };

  // const setForms = async () => {
  //   if (project.forms === true) {
  //     console.log(
  //       chalk.yellow(`Writing "zengenti-forms-package" to package.json...`)
  //     );

  //     const package = `./${project.directory}/package.json`;
  //     const file = require(package);

  //     file.dependencies["zengenti-forms-package"] = "^2.0.0-beta.2";

  //     fs.writeFileSync(package, JSON.stringify(file), function writeJSON(err) {
  //       if (err) return console.log(err);
  //     });
  //     console.log(
  //       chalk.bgGreen(
  //         `Successfully wrote "zengenti-forms-package" to package.json!`
  //       )
  //     );
  //   } else {
  //     console.log(chalk.yellow(`Forms module not required.`));
  //   }
  // };

  const setForms = async () => {
    if (project.psComponents) {
      console.log(chalk.yellow("Adding Zengenti Forms Package..."));
      exec(
        `cd ${project.directory} && npm install --save --package-lock-only --no-package-lock zengenti-forms-package`,
        (error, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }

          if (stderr) {
            // console.log(`stderr: ${stderr}`);
            return;
          }

          // console.log(chalk.bgGreen("Zengenti Forms Package added!"));
        }
      );
    }
  };

  const setPSComponents = async () => {
    if (project.psComponents) {
      console.log(chalk.yellow("Adding PS Component Library..."));
      exec(
        `cd ${project.directory} && npm install --save --package-lock-only --no-package-lock zengenti-ps-components`,
        (error, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }

          if (stderr) {
            // console.log(`stderr: ${stderr}`);
            return;
          }

          // console.log(chalk.bgGreen("PS Component Library added!"));
        }
      );
    }
  };

  const setComposer = async () => {
    if (project.composer === false) {
      console.log(chalk.yellow("Removing Composer from project..."));
      exec(
        `cd ${project.directory}/src/app && rm dynamic/composer.ts && rm -rf pages/Content && rm -rf features/composer && rm -rf features/markup`,
        (error, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            // console.log(`stderr: ${stderr}`);
            return;
          }
          // console.log(chalk.bgGreen("Removed Composer from project."));
        }
      );
    }
  };

  const finishBuild = async () => {
    console.log(chalk.yellow("Installing react-starter..."));

    exec(`cd ${project.directory} && rm -rf .git`, (error, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        // console.log(`stderr: ${stderr}`);
        return;
      }
    });
  };

  const build = async () => {
    try {
      console.log(
        chalk.yellow(`Cloning react-starter to ${project.directory}...`)
      );

      await git.clone(defaultRepo, project.directory);

      console.log(
        chalk.bgGreen(
          `Successfully cloned react-starter to ${project.directory}!`
        )
      );

      await setPackage();
      await setENV();
      await setForms();
      await setPSComponents();
      await setComposer();
      await finishBuild();

      console.log(chalk.bgGreen("Install complete!"));
    } catch (e) {
      console.log("Error!", e);
    }
  };

  build();
};

run();
