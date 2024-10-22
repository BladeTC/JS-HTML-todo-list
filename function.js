const btn = document.getElementById("press");
let btndone = document.getElementById("done");
//let arr = [1,2,'arr','sai'];
//let todoSet = localStorage.setItem("todo",JSON.stringify(arr));

function postList() {
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  let doneGet = JSON.parse(localStorage.getItem("done"));
  if (todoGet != null) {
    for (let i = 0; i < todoGet.length; i++) {
      if (i == 0) {
        document.getElementById("to-be-list").innerHTML =
          "<li>" +
          "<input type='checkbox' class='donecheck' value='" +
          i +
          "'/> | " +
          todoGet[i] +
          "</li>";
      } else {
        document.getElementById("to-be-list").innerHTML +=
          "<li>" +
          "<input type='checkbox' class='donecheck' value='" +
          i +
          "'/> | " +
          todoGet[i] +
          "</li>";
      }
    }
  } else {
    localStorage.setItem("todo", JSON.stringify(todoGet));
    document.getElementById("done-list").innerHTML = "";
  }
  if (doneGet != null) {
    for (let i = 0; i < doneGet.length; i++) {
      if (i == 0) {
        document.getElementById("done-list").innerHTML =
          "<li>" + doneGet[i] + "</li>";
      } else {
        document.getElementById("done-list").innerHTML +=
          "<li>" + doneGet[i] + "</li>";
      }
    }
  } else {
    localStorage.setItem("done", JSON.stringify([]));
    document.getElementById("done-list").innerHTML = "";
  }
}

function addToList() {
  let item = document.getElementById("todoitem").value;
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  if (item.value == "") {
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
  location.reload();
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
  location.reload();
  return 0;
}

function deleteDone() {
  localStorage.setItem("done", JSON.stringify([]));
  postList();
  location.reload();
  return 0;
}

postList();

btn.addEventListener("click", function () {
  addToList();
});
btndone.addEventListener("click", function () {
  doneChecked();
});
document.getElementById("deleteDone").addEventListener("click", function () {
  deleteDone();
});
