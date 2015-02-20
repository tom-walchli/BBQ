class Appointment < ActiveRecord::Base
	belongs_to :user
	belongs_to :barbeque

	def self.find(id)
		find_by(id: id)
	end

end
