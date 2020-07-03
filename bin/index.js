#!/usr/local/bin/node

const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const commander = require('commander');
const download = require('download-git-repo');
const ora = require('ora');

const { log } = console;
const url = 'Oligocalse/cup-cli-template';

const tipsLog = (text = '') => {
  log(chalk.yellow.bold(text))
}

const successLog = (text = '') => {
  log(chalk.green.bold(text))
}

const errorLog = (text = '') => {
  log(chalk.red.bold(text))
}

commander
  .version(require('../package').version)
  .usage('<command> [options]')

const agrs = process.argv.slice(2);
const projectName = agrs[0];

// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();
// 执行下载方法并传入参数
download(
  url,
  projectName,
  err => {
    if (err) {
      spinner.fail();
      errorLog(`Generation failed. ${err}`)
      return
    }
    // 结束加载图标
    spinner.succeed();
    successLog('\n Generation completed!')
    tipsLog(`\n To get started`)
    tipsLog(`\n cd ${projectName} & run yarn`)
  }
)

// 无参数时默认输出help信息
if (!projectName) {
  commander.outputHelp();
}

// 解析参数
commander.parse(process.argv);
