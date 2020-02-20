Rails.application.routes.draw do
  root to: "homes#show"

  resources :todos, only: [:index, :create, :destroy]
end
