import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { parseForm } from "../util/parseForm"
import FlipMove from 'react-flip-move';

const Todos = ({name, todos}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    Inertia.post('/todos', { todo: parseForm(e.target) }).then(() => form.reset())
  }

  const handleDelete = (id) => {
    Inertia.delete(`/todos/${id}`, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <div>
      <p>Hiya, {name}!</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="submit" value="Create" />
      </form>

      <ul>
        <FlipMove enterAnimation="elevator" leaveAnimation="accordionVertical">
          {todos.map(todo => (
            <li key={todo.id}>
              <button onClick={() => handleDelete(todo.id)}>X</button>
              {todo.title}
            </li>
          ))}
        </FlipMove>
      </ul>
    </div>
  )
}

export default Todos
