require 'rails_helper'

require 'rails_helper'

RSpec.describe 'Users', type: :request do
#   let(:user) { create(:user) }
  let(:valid_params_for_create) { {user: { email: "newuser@test.com", first_name: "billy", last_name: "bob", password: "password123" }} }

  describe "GET #new" do
    # before(:each) { @request.env["devise.mapping"] = Devise.mappings[:user] }

    it "should render new template when no user" do
      get '/new'
      expect(response).to render_template(:new)
    end

    it "should redirect to to edit business owner if user is authenticated" do
    #   sign_in user
      get '/new'
      expect(response).to redirect_to edit_business_owner_path
    end
  end

#   describe "POST #create" do
#     # before(:each) { @request.env["devise.mapping"] = Devise.mappings[:user] }
#     before(:each) { allow_any_instance_of(User).to receive(:send_devise_notification) }

#     it "successfully creates an account" do
#       post :create, valid_params_for_create
#       expect(User.count).to eq(1)
#     end

#     it "should assign the r_create role to the user" do
#       post :create, valid_params_for_create
#       expect(User.last.has_role? :r_create).to eq(true)
#     end

#     it "redirects to new business owner after successful create" do
#       post :create, valid_params_for_create
#       expect(response).to redirect_to new_business_owner_path
#     end

#     it "should redirect if authenticated user tries to create" do
#       sign_in user
#       post :create, user: { email: "newuser@test.com", password: "password123" }
#       expect(response).to redirect_to users_dashboard_path
#     end
#   end

#   describe "GET #edit" do
#     before(:each) { @request.env["devise.mapping"] = Devise.mappings[:user] }

#     it "should render edit template when user is authenticated" do
#       sign_in user
#       get :edit
#       expect(response).to render_template(:edit)
#     end

#     it "should redirect to user sign up when no user" do
#       get :edit
#       expect(response).to redirect_to new_user_session_path
#     end
#   end

#   describe "PATCH #update" do
#     # before(:each) { sign_in user }

#     it "shouldn't allow unauthenticated access" do
#       patch :update
#       expect(response).to redirect_to new_user_session_path
#     end

#     context "authenticated user" do
#     #   before(:each) { sign_in user }

#       it "should assign the r_create role to the user on successful update" do
#         patch :update, {user: { first_name: "billy", l_name: "bob", contact_num: "0423123456" }}
#         expect(User.last.has_role? :r_create).to eq(true)
#       end

#       it "should render edit template if first_name, l_name and contact_num aren't provided" do
#         patch :update, {user: { first_name: "billy" }}
#         expect(response).to render_template(:edit)
#       end

#       it "shouldn't assign r_create role without first_name, l_name and contact_num" do
#         patch :update, {user: { first_name: "billy" }}
#         expect(user.has_role? :r_create).to eq(false)
#       end

#       it "should render edit if user doesn't have first_name, l_name and contact_num" do
#         patch :update, {user: { first_name: "billy" }}
#         expect(response).to render_template(:edit)
#       end

#       it "should redirect to new business owner page after successful update which doesn't require current password" do
#         patch :update, {user: { first_name: "billy", l_name: "bob", contact_num: "0423123456" }}
#         expect(response).to redirect_to new_business_owner_path
#       end
#     end
#   end
end
