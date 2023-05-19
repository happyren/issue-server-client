const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const apiUrl = "http://localhost:5003";

const createIssue = (issue) => {
  axios.post(`${apiUrl}/issues`, issue)
    .then(res => {
      console.log("Issue created:", res.data);
      prompt();
    })
    .catch(err => {
      console.error("Error creating issue:", err.message);
      prompt();
    });
}

const  readIssue = (id) => {
  axios.get(`${apiUrl}/issues/${id}`)
    .then(res => {
      console.log("Issue fetched:", res.data);
      prompt();
    })
    .catch(err => {
      console.error("Error fetching issue:", err.message);
      prompt();
    });
}

const updateIssue = (issue) => {
  axios.put(`${apiUrl}/issues/${issue.id}`, issue)
    .then(res => {
      console.log("Issue updated:", res.data);
      prompt();
    })
    .catch(err => {
      console.error("Error updating issue:", err.message);
      prompt();
    });
}

const updateIssuePrompt = () => {
  let _id, _title, _description;
  rl.question("Enter issue id: ", (id) => {
    _id = id;
    rl.question("Enter issue title: ", (title) => {
      _title = title;
      rl.question("Enter issue description: ", (description) => {
        _description = description;
        updateIssue({ id: _id, title: _title, description: _description });
      });
    });
  });
};

const createIssuePrompt = () => {
  let _id, _title, _description;
  rl.question("Enter issue id: ", (id) => {
    _id = id;
    rl.question("Enter issue title: ", (title) => {
      _title = title;
      rl.question("Enter issue description: ", (description) => {
        _description = description;
        createIssue({ id: _id, title: _title, description: _description });
      });
    });
  });
};

const deleteIssue = (id) => {
  axios.delete(`${apiUrl}/issues/${id}`)
    .then(res => {
      console.log("Issue deleted:", res.data);
      prompt();
    })
    .catch(err => {
      console.error("Error deleting issue:", err.message);
      prompt();
    });
}

function prompt() {
  rl.question("Enter command: ", (input) => {
    const commandParts = input.split(" ");
    const command = commandParts[0].toLowerCase();

    if (command === "create") {
      createIssuePrompt();
    } else if (command === "read") {
      rl.question("Enter issue id: ", (id) => {
        readIssue(id);
      });
    } else if (command === "update") {
      updateIssuePrompt();
    } else if (command === "delete") {
      rl.question("Enter issue id: ", (id) => {
        deleteIssue(id);
      });
    } else if (command === "exit") {
      rl.close();
    } else {
      console.log("Invalid command! Use create, read, update, delete, or exit.");
      prompt();
    }
  });
}

prompt();