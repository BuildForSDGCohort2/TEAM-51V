class Api::V1::MentorshipsController < ApplicationController
    before_action :authenticate_user!

    def create
        mentorship = Mentorship.new(mentor: User.find_by(username: params[:username]), mentee: current_user)
        if mentorship.save
            render json: mentorship
        else
            render json: mentorship.errors, status: :unprocessed_entity
        end
    end
    def destroy
        mentorship = Mentorship.find_by(mentor: User.find_by(username: params[:id]), mentee: current_user)
        if mentorship && mentorship.destroy
            render json: :no_content
        else
            render json: {}, status: 422
        end
    end
    
end
