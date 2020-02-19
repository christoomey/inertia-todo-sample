class HomesController < ApplicationController
  def show
    render inertia: 'Home'
  end
end
