const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTask = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTask(tasks);
  console.log("Task added", task);
};

const listTask = () => {
  const tasks = loadTasks();
  tasks.forEach((task) => {
    console.log(task);
  });
};

const removeTask = (index) => {
  const tasks = loadTasks();

  tasks.splice(index - 1, 1);
  console.log(tasks);
  saveTask(tasks);
};
const command = process.argv[2];
const argument = process.argv[3];

console.log(command);

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTask();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("command not found");
}
