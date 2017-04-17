'use strict';

import chalk from 'chalk';
import packageJson from '../../package.json';

/**
 * Fetch the arguments passed
 */
let argv = require('minimist')(process.argv.slice(2), {
  boolean: ['overwrite', 'help', 'version'],
  string: ['project', 'destination'],
  alias: {
    o: 'overwrite',
    m: 'merge',
    p: 'project',
    d: 'destination',
    h: 'help',
    v: 'version'
  },
  default: {
    overwrite: false,
    merge: false,
    project: 'node',
    destination: false,
    help: false,
    version: false
  }
});

//@todo implement ls and project

let { overwrite, merge, project, destination, help, version } = argv;

if (version) {
  console.log(packageJson.version);
  process.exit();
}

if (help || argv._.length < 1) {
  console.log(
    chalk.green(
      `\n` +
      `Usage: ${packageJson.name} <dotfiles> [options]\n`) +
    `\n` +
    `Options:\n` +
    `-o, --overwrite    overwrite existing dotfiles, if already exist\n` +
    `-m, --merge    merge existing dotfiles, if already exist\n` +
    `-p, --project      project specific dotfiles (e.g. node, react), default is node\n` +
    `-d, --destination  destination where dotfiles should be installed, default is current directory\n` +
    `-h, --help         output usage information\n` +
    `-v, --version      output the version number\n` +
    `\n` +
    `Please visit https://github.com/sun1l/dotfiles-generator for examples and more info.\n`
  );
  process.exit();
}

require('../lib/dotfileGenerator')(argv._, {
  overwrite,
  merge,
  project,
  destination,
  help,
  version
});
