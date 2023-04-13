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
  const newTodo = {
    title: event.target.firstElementChild.value,
    completed: false,
  }
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => addToDom(data))
}

const toggleCompletion = (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed')
    updateTodo(
      event.target.dataset.id,
      event.target.classList.contains('completed')
    )
  }
}

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      completed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
}

const deleteTodo = (event) => {
  if (event.target.tagName === 'LI') {
    const id = event.target.dataset.id
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => event.target.remove())
  }
}

const init = () => {
  const form = document.querySelector('#todo-form')
  const list = document.querySelector('#todo-list')
  document.addEventListener('DOMContentLoaded', getTodos)
  form.addEventListener('submit', createTodo)
  list.addEventListener('click', toggleCompletion)
  list.addEventListener('dblclick', deleteTodo)
}

init()
