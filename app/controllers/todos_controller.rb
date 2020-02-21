class TodosController < ApplicationController
  def index
    todos = filtered_todos.order(created_at: :desc)

    render inertia: 'Todos', props: {
      name: params.fetch(:name, "World"),
      todos: todos.as_json(only: [:id, :title, :complete]),
      activeCount: Todo.where(complete: false).count,
      totalCount: Todo.all.count,
    }
  end

  def create
    Todo.create(params.require(:todo).permit(:title))

    redirect_back(fallback_location: todos_path)
  end

  def destroy
    Todo.find(params.fetch(:id)).destroy

    redirect_back(fallback_location: todos_path)
  end

  def update
    todo = Todo.find(params.fetch(:id))
    todo.update!(params.require(:todo).permit(:title))

    redirect_back(fallback_location: todos_path)
  end

  private

  def filtered_todos
    if params[:filter] == "active"
      Todo.where(complete: false)
    elsif params[:filter] == "completed"
      Todo.where(complete: true)
    else
      Todo.all
    end
  end

  def filter_param
    params.fetch(:filter, "all")
  end
end
