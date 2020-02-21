class SweepsController < ApplicationController
  def create
    Todo.where(complete: true).destroy_all

    redirect_back(fallback_location: todos_path)
  end
end
