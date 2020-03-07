import React, { useState, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react';
import { parseForm } from "../util/parseForm"
import { Todo } from "../components/Todo"
import FlipMove from 'react-flip-move';

const Todos = ({name, todos, activeCount, totalCount}) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setIsLoading(true);
    Inertia.post('/todos', { todo: parseForm(e.target) }).then(() => {
      setIsLoading(false);
      form.reset();
      inputRef.current.focus();
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
          <input autoFocus type="text" name="title" ref={inputRef} />
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
        <p>{activeCount}/{totalCount} remaining
          {activeCount != totalCount && (
            <button onClick={sweep}>sweep</button>
          )}
        </p>
        <p className="filters">
          <InertiaLink href="/todos">All</InertiaLink>
          <InertiaLink href="/todos?filter=active">Active</InertiaLink>
          <InertiaLink href="/todos?filter=completed">Completed</InertiaLink>
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
