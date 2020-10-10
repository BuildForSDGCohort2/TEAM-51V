module Api
    module V1
        class StatsController < ApplicationController
            before_action :authenticate_user!
            def index
                render json: {
                    # mentees_this_month: current_user.mentees.where('mentorships.created_at': [Time]),
                    # mentees_today: current_user.mentees.where('mentorships.created_at': [Time.today.])
                }
            end
            
        end
    end
end
