class CreateMentorships < ActiveRecord::Migration[6.0]
  def change
    create_table :mentorships, id: :uuid do |t|
      t.uuid :mentor_id, foreign_key: true
      t.uuid :mentee_id, foreign_key: true

      t.timestamps
    end
  end
end
