import { h, render } from "https://esm.sh/preact";
import { useState } from "https://esm.sh/preact/hooks";
import "https://esm.sh/preact/debug";
import htm from "https://esm.sh/htm";

// Initialize htm with Preact
const html = htm.bind(h);

let i = true;

function App() {
  let [dones, setDones] = useState({});
  function remove_done(){
   setDones({});
  };
  return html`<main>
    <h1>To do list</h1>
    <${TodoList} dones=${dones} setDones=${setDones}/>
    <h2>Done list</h2>
    <${DoneList} dones=${dones} remove_done=${remove_done}/>
  </main>`;
}

//

function TodoList(props) {
  let [todos, setTodos] = useState({});
  let {dones,setDones} = props;

  function add_todo(key, value) {
    setTodos({ ...todos, [key]: value });
  }

  function callcheck(key){
    let todos2 = {...todos};
    delete todos2[key];
    setTodos(todos2);
  }

  return html`<div>
    <${TodoForm} add_todo=${add_todo} />
    <ul>
      ${Object.entries(todos).map(
        ([key, value]) =>
          html`<li key=${key}>
          <input type="checkbox" onClick=${() =>add_to_done({dones,setDones},{todos,setTodos},key,value)}/>
            ${value}<input
    type="button"
    value="Delete"
    name="box"
    onClick=${() => callcheck(key)}
  />
          </li>`
      )}
    </ul>
  </div>`;
}

function TodoForm(props) {
  let { add_todo } = props;

  function handle_submit(e) {
    e.preventDefault();
    let form_data = new FormData(e.target);
    add_todo(Date.now(), form_data.get("fname"));
    document.getElementById("text_field").value = "";
  }

  return html` <form onSubmit=${handle_submit}>
    <input type="text" id="text_field" name="fname" required />
    <button type="submit">Add</button>
  </form>`;
}

//
function add_to_done(done_props,todo_props,key,value){
  let {dones,setDones} = done_props;
  let {todos,setTodos} = todo_props;
  let new_todos = todos;
  delete new_todos[key];
  setTodos(new_todos);
  setDones({...dones,[key]: value});
}

function DoneList(props) {
  let {dones,remove_done} = props;
  return html`<div>
    <button onClick=${remove_done}>Delete done</button>
    <ul>
      ${Object.entries(dones).map(
        ([key, value]) =>
          html`<li key=${key}>
            ${value}
          </li>`
      )}
    </ul>
  </div>`;
}

render(html`<${App} />`, document.body);
