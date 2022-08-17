import storage from "./util/storage.js";

const init = {
  todos: storage.get(),
  filter: 'all',
  filters: {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }
}

const actions = {
  ADD({ todos }, title) {
    if (title) {
      todos.push({ title, completed: false }) // push to state
      storage.set(todos)
    }
  },
  TOGGLE({ todos }, index) {
    const todo = todos[index]
    todo.completed = !todo.completed
    storage.set(todos)
  },
  TOGGLE_ALL({ todos }, completed) {
    todos.forEach(todo => todo.completed = completed)
    storage.set(todos)
  },
  DESTROY({ todos }, index) {
    todos.splice(index, 1)
    storage.set(todos)
  }
}

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args) // logic 
  return state // receive data from actions
}
