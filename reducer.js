import storage from "./util/storage.js";

const init = {
  todos: storage.get(),
  filter: 'all',
  filters: {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  },
  editIndex: null
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
  },
  SWITCH(state, filter) {
    state.filter = filter
  },
  CLEAR_COMPLETED(state) {
    state.todos = state.todos.filter(state.filters.active)
    storage.set(state.todos)
  },
  START_EDIT(state, index) {
    state.editIndex = index
  },
  END_EDIT(state, title) {
    if (state.editIndex !== null) {
      if (title) {
        state.todos[state.editIndex].title = title
        state.editIndex = null
        storage.set(state.todos)
      } else {
        this.DESTROY(state, state.editIndex)
      }
      state.editIndex = null
    }
  },
  CANCEL_EDIT(state) {
    state.editIndex = null
  }
}

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args) // logic 
  return state // receive data from actions
}
