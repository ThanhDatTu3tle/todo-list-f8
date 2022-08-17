import html from "../../react-redux/core.js";

function TodoItem({ todo, index }) {
  return html`
    <li class="${todo.completed && 'completed'}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange="dispatch('TOGGLE', ${index})">
        <label>${todo.title}</label>
        <button class="destroy" onclick="dispatch('DESTROY', ${index})"></button>
      </div>
      <input class="edit" value="${todo.title}">
    </li>
  `
}

export default TodoItem
