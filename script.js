const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

const getTodos = () => {
  fetch(`${apiUrl}?_limit=5`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      data.forEach((todo) => {
        addToDom(todo)
      })
    })
}

const addToDom = (todo) => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(todo.title))
  if (todo.completed) {
    li.classList.add('completed')
  }
  li.setAttribute('data-id', todo.id)
  document.getElementById('todo-list').appendChild(li)
}

const createTodo = (event) => {
  event.preventDefault()
  console.log(event.target.firstElementChild.value)
}

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos)
  const form = document.querySelector('#todo-form')
  form.addEventListener('submit', createTodo)
}

init()
