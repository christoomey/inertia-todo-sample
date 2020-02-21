import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { parseForm } from "../util/parseForm"
import { Todo } from "../components/Todo"
import FlipMove from 'react-flip-move';

const Todos = ({name, todos}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setIsLoading(true);
    Inertia.post('/todos', { todo: parseForm(e.target) }).then(() => {
      setIsLoading(false);
      form.reset()
    })
  }

  const sweep = () => {
    setIsLoading(true);
    Inertia.post('/sweep').then(() => setIsLoading(false))
  }

  return (
    <div className="page">
      <p>Hiya, {name}!</p>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <input autoFocus type="text" name="title" />
          <input type="submit" value="Create" />
        </fieldset>
      </form>

      <ul>
        <FlipMove enterAnimation="elevator" leaveAnimation="accordionVertical">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              toggleComplete={toggleComplete}
            />
          ))}
        </FlipMove>
      </ul>
      <div>
        <p>{todos.filter(t => !t.complete).length}/{todos.length} remaining
          <button onClick={sweep}>sweep</button>
        </p>
      </div>
    </div>
  )
}

const toggleComplete = (todo) => (
  todo.complete
    ? (Inertia.delete(`/todos/${todo.id}/completion`, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    }))
    : (Inertia.post(`/todos/${todo.id}/completion`, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    }))
)

const handleDelete = (id) => (
  Inertia.delete(`/todos/${id}`, {
    replace: true,
    preserveState: true,
    preserveScroll: true,
  })
)

const handleUpdate = (id, data) => (
  Inertia.patch(`/todos/${id}`, { todo: data }, {
    replace: true,
    preserveState: true,
    preserveScroll: true,
  })
)

export default Todos
