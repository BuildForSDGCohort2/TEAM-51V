class CreateMentorships < ActiveRecord::Migration[6.0]
  def change
    create_table :mentorships, id: :uuid do |t|
      t.uuid :mentor_id, foreign_key: true
      t.uuid :mentee_id, foreign_key: true

      t.timestamps
    end
    # add_index :mentorships, :mentor_id
    # # add_index :mentorships, :mentee_id
    # add_index :mentorships, [:mentor_id, :mentee_id], unique: true
  end
end
