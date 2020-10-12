class User < ApplicationRecord
  has_person_name
  has_one_attached :avatar
  has_one_attached :cover_image


  has_many :mentee_relationships, foreign_key: :mentor_id, class_name: 'Mentorship'
  has_many :mentees, through: :mentee_relationships, source: :mentee

  has_many :mentor_relationships, foreign_key: :mentee_id, class_name: 'Mentorship'
  has_many :mentors, through: :mentor_relationships, source: :mentor

  validates_presence_of :username
  validates :username, uniqueness: { case_sensitive: false }
  validates_presence_of :name
  validates_presence_of :email

  has_secure_token :auth_token

  after_create :regenerate_auth_token

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
