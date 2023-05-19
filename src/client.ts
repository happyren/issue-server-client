#!/usr/bin/env node

import yargs from 'yargs';
// import axios from 'axios';

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .option("c", { alias: "command", describe: "Command to execute", type: "string", demandOption: true })
  .option("i", { alias: "id", describe: "Issue ID", type: "string" })
  .option("p", { alias: "path", describe: "Path to a json issue to be submitted", type: "string" })
  .argv;
