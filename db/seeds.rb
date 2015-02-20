# Seed Barbecues
# 10.times do
#   title = [ "#{Faker::Team.name} victory BBQ", "#{Faker::Name.name} Birthday BBQ" ].sample
#   venue = [ Faker::Address.city, Faker::Company.name ].sample

#   puts "Creating #{title} at #{venue}"
#   Barbecue.create(date: Faker::Date.forward(23), title: title, venue: venue)
# end

# 10.times do 
#   name = Faker::Name.name
#   email = Faker::Internet.email

#   puts "Creating #{name} email: #{email}"
#   user = User.new(name: name, email: email, password: 'aaaaaaaa')
#   if !user.save
#   	puts user.errors.full_messages
#   end
# end

bringing = ['6 pack', 'cookies', '12 pack', 'steaks', 'sausages']

(1..10).each do |k|
	(1..3).each do |j|
		appt = Appointment.new(user_id: k, barbecue_id: 1+rand(20), bringing: bringing.sample)
		if !appt.save
  			puts appt.errors.full_messages
	    end
	end
end

