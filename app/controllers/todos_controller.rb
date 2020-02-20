class TodosController < ApplicationController
  def index
    todos = Todo.all.order(created_at: :desc)

    render inertia: 'Todos', props: {
      name: params.fetch(:name, "World"),
      todos: todos.as_json(only: [:id, :title]),
    }
  end

  def create
    Todo.create(params.require(:todo).permit(:title))

    redirect_to to: :index
  end
end
