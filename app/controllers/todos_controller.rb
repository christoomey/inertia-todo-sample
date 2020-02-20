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

    redirect_to action: :index
  end

  def destroy
    Todo.find(params.fetch(:id)).destroy

    redirect_to action: :index
  end

  def update
    todo = Todo.find(params.fetch(:id))
    todo.update!(params.require(:todo).permit(:title))

    redirect_to action: :index
  end
end
