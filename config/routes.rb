Rails.application.routes.draw do
  # devise_for :views
  devise_for :users, :controller => { registrations: 'registrations' }
  root 'barbecues#index'

  resources :barbecues, only: [ :index, :show, :new, :create ]

  scope :api do
  	get '/barbecue/:id' 	=> "api#show", :as => 'api_barbecue'
  	# post '/barbecue' 		=> "api#bbq_create"
  end
end
