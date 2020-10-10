class AddIsMentorToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is_mentor, :boolean, default: false
  end
end
