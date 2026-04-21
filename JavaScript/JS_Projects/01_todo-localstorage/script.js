document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.querySelector("#todo-input");
  let addTaskBtn = document.querySelector("#add-task-btn");
  let todoList = document.querySelector("#todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((element) => {
    render(element);
  });

  addTaskBtn.addEventListener("click", function () {
    const taskText = todoInput.value.trim();
    if (taskText == "") return;
    else {
      let obj = {
        key: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(obj);
      saveTask();
      render(obj);
      todoInput.value = "";
    }
  });

  function render(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.key);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    console.log(li);
    todoList.appendChild(li);
    li.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle from firing
      li.remove();
      tasks = tasks.filter((element) => {
        if (element.key != task.key) return true;
      });
      saveTask();
    });
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
