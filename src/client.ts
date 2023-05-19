#!/usr/bin/env node

import yargs from 'yargs';
import axios from 'axios';
import fs from 'fs';

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .option("c", { alias: "command", describe: "Command to execute", type: "string", demandOption: true })
  .option("i", { alias: "id", describe: "Issue ID", type: "string" })
  .option("p", { alias: "path", describe: "Path to a json of issue to be submitted", type: "string" })
  .example("$0 -c get -i 1", "Get issue with id 1")
  .example("$0 -c create -p ./issue.json", "Create issue from json file")
  .example("$0 -c delete -i 1", "Delete issue with id 1")
  .example("$0 -c update -p ./issue.json", "Update issue from json file")
  .argv;

// @ts-ignore
const { command, id, path } = argv;

if (command.toLowerCase() === "get") {
  console.log("Getting issue");
  axios.get(`http://localhost:5003/issues/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log("issue not found"));
}

if (command.toLowerCase() === "create") {
  console.log("Creating issue");
  fs.readFile(path, (err, data) => {
      if (err) throw err;
      const issue = JSON.parse(data.toString());
      console.log(issue);
      axios.post(`http://localhost:5003/issues`, issue)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    });
}

if (command.toLowerCase() === "delete") {
  console.log("Deleting issue");
  axios.delete(`http://localhost:5003/issues/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

if (command.toLowerCase() === "update") {
  console.log("Deleting issue");
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    const issue = JSON.parse(data.toString());
    console.log(issue);
    axios.put(`http://localhost:5003/issues`, issue)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  });
}