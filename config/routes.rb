require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'users', to: 'users#index'
      get 'users/:id', to: 'users#show'

      resources :mentors
      resources :mentees
    end
  end

  get '*path', to: 'pages#index'
  root to: 'pages#index'
end
