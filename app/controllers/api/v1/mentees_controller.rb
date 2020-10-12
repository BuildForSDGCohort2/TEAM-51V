module Api
  module V1
    class MenteesController < ApplicationController
      before_action :authenticate_user!
      before_action :set_mentee, only: %i[show]

      def index
        render json: current_user.mentees || []
      end

      def show
        render json: @mentee
      end

      private

      def set_mentee
        @mentee = User.find_by(username: params[:id])
      end
    end
  end
end
