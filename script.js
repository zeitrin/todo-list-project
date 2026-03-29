const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  
  if (text === "") {
    alert("Введите задачу");
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span")
  span.textContent = text;
  
  span.addEventListener("click", () => {
    span.classList.toggle("done");
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
});