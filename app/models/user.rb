class User < ApplicationRecord
  has_person_name
  has_one_attached :avatar
  has_one_attached :cover_image

  has_many :mentorships, foreign_key: :mentee_id
  has_many :mentorships, foreign_key: :mentor_id
  has_many :mentors, through: :mentorships, foreign_key: :mentor_id
  has_many :mentees, through: :mentorships, foreign_key: :mentee_id


  # has_many :mentors, source: :mentorships, foreign_key: :mentor_id
  # has_many :mentees, source: :mentorships, foreign_key: :mentee_id

  # has_many :mentees, class_name: 'Mentorship', foreign_key: :mentee_id
  # has_many :mentors, through: :mentees

  # has_many :mentors, class_name: 'Mentorship', foreign_key: :mentor_id
  # has_many :mentees, through: :mentors

  # has_many :mentees, class_name: 'Mentorship', foreign_key: :mentor_id
  # has_many :mentors, class_name: 'Mentorship', foreign_key: :mentee_id

  validates_presence_of :username
  validates_presence_of :name
  validates_presence_of :email

  has_secure_token :auth_token

  after_create :regenerate_auth_token

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
