class Barbecue < ActiveRecord::Base
  has_many :appointments
  has_many :users, :through => :appointments

  validates :title, presence: true
  validates :venue, presence: true
  validates :date, presence: true
end
