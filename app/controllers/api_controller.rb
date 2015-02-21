class ApiController < ApplicationController

  def show
	bbq = Barbecue.find_by(id: params[:id])
	render(json: bbq)
  end

  def join
  	appt = Appointment.new(user_id: current_user.id, barbecue_id: params[:id].to_i, bringing: params[:bringing])
  	if !appt.save
  		puts appt.errors.full_messages
  	end
  	render(json: {appt: appt, user: current_user})
  end

  def bring
  	appt = Appointment.find(params[:id])
  	if !appt.update_attributes(:bringing => params[:bringing])
  		puts appt.errors.full_messages
  	end
  	render(json: {appt: appt, user: current_user})
  end

end
