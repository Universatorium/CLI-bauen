#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import child from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import os from 'os';
const readme = "Inhaltsverzeichnis";
const spinner = ora();
const bs = os.platform();
console.clear();

console.log(chalk.blue('Aktuelles Betriebssystem:', bs));
console.log('\n');

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
        'Neues Git Repository mit Readme und NPM init',
        'Abbrechen'
      ]
    }
  ])
  .then((choice) => {
    
    if (choice.gitandnpm === 'Neues Git Repository') {
      spinner.start('Initialisiere Git Repository...');
      console.log('\n');
      child.exec('git init', () => {
        spinner.succeed(chalk.greenBright('Git Repository erstellt.'));
        console.log('\n');
      });
    } else if (choice.gitandnpm === 'Neues Git Repository mit Readme') {
      spinner.start('Initialisiere Git Repository...');
      child.exec('git init', () => {
        spinner.succeed(chalk.greenBright('Git Repository erstellt.'));
        fs.appendFileSync('README.md', readme);
        console.log(chalk.cyan('... Readme erstellt/ergänzt'));
      });
    } else if (choice.gitandnpm === 'Neues Git Repository mit Readme und NPM init') {
      spinner.start('Initialisiere Git Repository...');
      child.exec('git init', () => {
      spinner.succeed(chalk.greenBright('Git Repository erstellt.'));
      fs.appendFileSync('README.md', readme);
      console.log(chalk.cyan('... Readme erstellt/ergänzt'));
      spinner.start('Initialisiere NPM...');
      child.exec('npm init -y', () => {
      spinner.succeed('NPM initialisiert.');
      });
    });
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
