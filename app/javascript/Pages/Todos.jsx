import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { parseForm } from "../util/parseForm"

const Todos = ({name, todos}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    Inertia.post('/todos', { todo: parseForm(e.target) }).then(() => form.reset())
  }

  return (
    <div>
      <p>Hiya, {name}!</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="submit" value="Create" />
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
      )
}

export default Todos
