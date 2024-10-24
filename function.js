const btn = document.getElementById("press");
let btndone = document.getElementById("done");
//let arr = [1,2,'arr','sai'];
//let todoSet = localStorage.setItem("todo",JSON.stringify(arr));

function postList() {
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  let doneGet = JSON.parse(localStorage.getItem("done"));
  if (todoGet != null) {
    for (let i = 0; i < todoGet.length; i++) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("donecheck");
      input.value = i;

      let li = document.createElement("li");
      li.appendChild(input);
      li.appendChild(document.createTextNode(todoGet[i]));

      document.getElementById("to-be-list").appendChild(li);
    }
  } else {
    localStorage.setItem("todo", JSON.stringify(todoGet));
    document.getElementById("to-be-list").appendChild = "";
  }
  if (doneGet != null) {
    for (let i = 0; i < doneGet.length; i++) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(doneGet[i]));

      document.getElementById("done-list").appendChild(li);
    }
  } else {
    localStorage.setItem("done", JSON.stringify([]));
    document.getElementById("done-list").appendChild = "";
  }
}

function addToList() {
  let item = document.getElementById("todoitem").value;
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  console.log(item);
  if (item == "") {
    return 0;
  }
  if (todoGet == null) {
    todoGet = [];
  }
  todoGet.push(item);
  postList();
  document.getElementById("todoitem").value = "";
  localStorage.setItem("todo", JSON.stringify(todoGet));
  postList();
  return 0;
}

function doneChecked() {
  let temp;
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  let doneGet = JSON.parse(localStorage.getItem("done"));
  let checkboxes = document.getElementsByClassName("donecheck");
  if (checkboxes.length == 0) {
    return 0;
  }
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      temp = todoGet.splice(i, 1);
      doneGet.push(temp);
    }
  }
  localStorage.setItem("todo", JSON.stringify(todoGet));
  localStorage.setItem("done", JSON.stringify(doneGet));
  postList();
  return 0;
}

function deleteDone() {
  let todoGet = [];
  localStorage.setItem("done", JSON.stringify(todoGet));
  postList();
  return 0;
}

postList();

btn.addEventListener("click", function () {
  if (!document.getElementById("todoitem").value) {
    return 0;
  }
  addToList();
  location.reload();
});
btndone.addEventListener("click", function () {
  doneChecked();
  location.reload();
});
document.getElementById("deleteDone").addEventListener("click", function () {
  deleteDone();
  location.reload();
});
