const btn = document.getElementById("press");
//let arr = [1,2,'arr','sai'];
//let todoSet = localStorage.setItem("todo",JSON.stringify(arr));
let todoGet = JSON.parse(localStorage.getItem('todo'));

if(todoGet == null){
    todoGet = [];
}
else{
    for(let i = 0; i < todoGet.length; i++){
        document.getElementById("to-be-list").innerHTML += "<li></li>"
    }
}

function mail() {
  //let email;
  item = document.getElementById("todoitem");
  console.log(item.value);
  if(item.value == ""){
    return 0;
  }
  
  document.getElementById("to-be-list").innerHTML += "<li><input type='checkbox'/> | "+ item.value  +"</li>"
  document.getElementById("todoitem").value = "";
  return 0;
}

btn.addEventListener("click", function () {
  mail();
});
