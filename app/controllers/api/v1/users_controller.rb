module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show]
      def index
        @users = User.all
        render json: @users
      end

      def show
        user =  @user.as_json
        user[:mentors_user] = @user.mentees.where(id: current_user.id).exists?
        render json: user
      end

      private

      def set_user
        @user = User.find_by(username: params[:id])
      end
    end
  end
end
