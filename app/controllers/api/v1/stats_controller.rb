module Api
    module V1
        class StatsController < ApplicationController
            before_action :authenticate_user!
            def index
                render json: {
                    mentees_this_month: current_user.mentees.where('mentorships.created_at': Date.today).count,
                    mentees_today: current_user.mentees.where('mentorships.created_at': Date.today).count
                }
            end
            
        end
    end
end
