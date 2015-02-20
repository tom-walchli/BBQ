Rails.application.routes.draw do
  # devise_for :views
  devise_for :users, :controller => { registrations: 'registrations' }
  root 'barbecues#index'

  resources :barbecues, only: [ :index, :show, :new, :create ]

  scope :api do

  	get  '/barbecue/:id' 					 => "api#show", :as => 'api_barbecue'
	post '/barbecues/:id/join'  			 => "api#join", :as => 'api_join_barbeque'
	post '/appointments/:id/bring/:bringing' => "api#bring",:as => 'api_bring_barbeque'

  end
end
