module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show]
      def index
        @users = User.all
        render json: @users
      end

      def show
        render json: @user
      end

      private

      def set_user
        @user = User.find_by(username: params[:id])
      end
    end
  end
end
