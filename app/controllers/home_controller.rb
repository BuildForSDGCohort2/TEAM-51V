class HomeController < ApplicationController
  def index
    # redirect_to mentor_dashboards_path and return if current_user
    
    render :index
  end
end
