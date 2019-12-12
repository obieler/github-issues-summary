#!/usr/bin/env node

const githubIssuesSummary = require('./index.js');
const chalk = require('chalk');
const jsonfile = require('jsonfile');

const yargs = require('yargs')
  .scriptName('github-issues-summary')
  .usage('$0 [args]')
  .help('h')
  .alias('h', 'help')
  .option('c', {
    alias: 'config',
    describe: 'Configure the path of config.json',
    requiresArg: true,
    nargs: 1,
    demand: 'config.json file is required',
    type: 'string'
  });

const argv = yargs.argv;

try {
  var config = jsonfile.readFileSync(argv.c);
} catch (e) {
  console.log(e);
}

githubIssuesSummary.getIssuesSummary(config, function (err, results) {
  if (err) {
    console.log('Error: ' + err);
  } else {
    for (var r of results) {
      console.log(chalk.bold.yellow(r.repository_name + ':'));
      console.log('  open issues: ' + r.open_issue);

      for (var l of r.open_issues_by_label) {
        console.log('    ' + l.name + ': ' + l.count);
      }
    }
  }
});
