class ApiV1TokenStrategy < Warden::Strategies::Base
  def valid?
    auth_token.present?
  end

  def authenticate!
    user = User.find_by(auth_token: auth_token)

    if user
      success!(user)
      cookies.clear
    else
      # cookies.clear
      fail!('Invalid login details')
    end
  end

    private

  def auth_token
    env['HTTP_AUTHORIZATION'].to_s.remove('Bearer ')
  end
end
