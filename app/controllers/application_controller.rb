class ApplicationController < ActionController::Base
  # include ActionController::MimeResponds
  protect_from_forgery with: :exception, unless: -> { allowed_request? }

  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json, :html

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar cover_image is_mentor username])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar cover_image is_mentor username])
  end
  
  def allowed_request?
    request.format.json?
  end
end
