const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  
  taskError.textContent = "";

  if (text === "") {
    taskError.textContent = "Поле ввода задачи пустое";
    return;
  }

  const normalizedText = text.toLowerCase();
  const existingTasks = Array.from(taskList.querySelectorAll("li span"));
  const isDuplicate = existingTasks.some(
    (task) => task.textContent.trim().toLowerCase() === normalizedText
  );

  if (isDuplicate) {
    taskError.textContent = "Такая задача уже существует";
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span")
  span.textContent = text;
  
  span.addEventListener("click", () => {
    span.classList.toggle("done");
    taskList.classList.toggle("done")
  });

  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Удалить"

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskError.textContent = "";
});
