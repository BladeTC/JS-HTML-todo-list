function postList() {
  //a
  refresh("to-be-list");
  refresh("done-list");
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  let doneGet = JSON.parse(localStorage.getItem("done"));
  if (todoGet != null) {
    for (let [key,val] of Object.entries(todoGet)) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("donecheck");
      input.value = key;

      let rev = document.createElement("button");
      rev.type = "button";
      rev.classList.add("delete");
      rev.value = key;
      rev.textContent = "delete";
      rev.addEventListener("click",function(evt){
        deleteToBe(key);
        evt.target.parentNode.remove();
      });

      input.addEventListener("click",function(){
        doneChecked(key);
        postList();
      });

      let li = document.createElement("li");
      li.appendChild(rev);
      li.appendChild(input);
      li.appendChild(document.createTextNode(todoGet[key]));

      document.getElementById("to-be-list").appendChild(li);
    }
  } else {
    localStorage.setItem("todo", JSON.stringify(todoGet));
    document.getElementById("to-be-list").appendChild = "";
  }
  if (doneGet != null) {
    for (let [key,val] of Object.entries(doneGet)) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(val));

      document.getElementById("done-list").appendChild(li);
    }
  } else {
    localStorage.setItem("done", JSON.stringify({}));
    document.getElementById("done-list").appendChild = "";
  }
}

function refresh(listid){
  const element = document.getElementById(listid);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  
}

function addToList() {
  let item = document.getElementById("todoitem").value;
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  if (item == "") {
    return 0;
  }
  if (todoGet == null) {
    todoGet = {};
  }
  todoGet[Date.now()]= item;
  document.getElementById("todoitem").value = "";
  localStorage.setItem("todo", JSON.stringify(todoGet));
  return 0;
}

function doneChecked(id) {
  let temp;
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  let doneGet = JSON.parse(localStorage.getItem("done"));
  doneGet[id] = todoGet[id];
  delete todoGet[id];
  localStorage.setItem("todo", JSON.stringify(todoGet));
  localStorage.setItem("done", JSON.stringify(doneGet));
  return 0;
}

function deleteToBe(id) {
  let todoGet = JSON.parse(localStorage.getItem("todo"));
  delete todoGet[id];
  localStorage.setItem("todo", JSON.stringify(todoGet));
  return 0;
}

function deleteDone() {
  let todoDone = {};
  localStorage.setItem("done", JSON.stringify(todoDone));
  return 0;
}

postList();

document.getElementById("press").addEventListener("click", function () {
  if (!document.getElementById("todoitem").value) {
    return 0;
  }
  addToList();
  postList();
});

document.getElementById("deleteDone").addEventListener("click", function () {
  deleteDone();
  postList();
});

// document.body.addEventListener("change", function (evt) {
//   if (evt.target.className === "donecheck") {
//     doneChecked(evt.target.value);
//     location.reload();
//   }
// });

// document.body.addEventListener("click", function (evt) {
//   if (evt.target.className === "delete") {
//     deleteToBe(evt.target.value);
//     location.reload();
//   }
// });
