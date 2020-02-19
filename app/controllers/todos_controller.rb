class TodosController < ApplicationController
  def index
    @todos = Todo.all

    render inertia: 'Home', props: { name: 'World' }
  end
end
