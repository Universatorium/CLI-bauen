#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import child from 'child_process';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import chalksay from 'chalksay';
const readme = "Inhaltsverzeichnis";
console.clear();

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'gitandnpm',
      message: chalk.magenta('Was möchtest du tun?'),
      default: 'Neues Git Repository mit Readme',
      choices: [
        'Neues Git Repository',
        'Neues Git Repository mit Readme',
        'Neues Git Repository mit Readme und NPM init'
      ]
    }
  ])
  .then((choice) => {
    // console.log(choice.gitandnpm);

    if (choice.gitandnpm === 'Neues Git Repository') {
      child.exec('git init');
      console.log('\n Git Repository erstellt.');
    } else if (choice.gitandnpm === 'Neues Git Repository mit Readme') {
      try {
        child.exec('git init');
        fs.writeFileSync('README.md', readme);
        console.log('Readme erstellt');
      } catch (e) {
        console.log(e); // will log an error because file already exists
      }
    } else if (choice.gitandnpm === 'Neues Git Repository mit Readme und NPM init') {
      try {
        child.exec('git init');
        fs.appendFileSync('README.md', readme);
        console.log('Readme erstellt');
        child.exec('npm init -v -y');
        console.log(chalksay.magenta('npm initialisiert'));
      } catch (e) {
        console.log(e); // will log an error because file already exists
      }
    }
    // else(return);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
