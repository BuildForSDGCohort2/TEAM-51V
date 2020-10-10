
Warden::Strategies.add(:auth_token, ApiV1TokenStrategy)
Warden::Manager.before_logout do |user,auth,opts|
  user.regenerate_auth_token
end