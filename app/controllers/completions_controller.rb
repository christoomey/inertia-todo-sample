class CompletionsController < ApplicationController
  def create
    todo = Todo.find(params.fetch(:todo_id))
    todo.update!(complete: true)

    redirect_back(fallback_location: todos_path)
  end

  def destroy
    todo = Todo.find(params.fetch(:todo_id))
    todo.update!(complete: false)

    redirect_back(fallback_location: todos_path)
  end
end
