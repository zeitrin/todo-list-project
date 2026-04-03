const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");

const STORAGE_KEY = "todo-tasks";

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => ({
    text: li.querySelector(".taskRow span").textContent.trim(),
    done: li.classList.contains("done"),
  }));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* quota / private mode */
  }
}

function createTaskLi(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("done");

  const span = document.createElement("span");
  span.textContent = text;

  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "taskDeleteBtn";
  deleteBtn.textContent = "\u00D7";
  deleteBtn.setAttribute("aria-label", "Удалить задачу");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  const row = document.createElement("div");
  row.className = "taskRow";
  row.appendChild(span);
  row.appendChild(deleteBtn);
  li.appendChild(row);

  return li;
}

function loadTasks() {
  let data;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    data = JSON.parse(raw);
    if (!Array.isArray(data)) return;
  } catch {
    return;
  }

  for (const item of data) {
    if (typeof item.text !== "string" || item.text.trim() === "") continue;
    taskList.appendChild(createTaskLi(item.text, Boolean(item.done)));
  }
}

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

  taskList.appendChild(createTaskLi(text, false));
  saveTasks();

  taskInput.value = "";
  taskError.textContent = "";
});

loadTasks();
