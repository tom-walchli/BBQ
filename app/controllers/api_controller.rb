class ApiController < ApplicationController

  def show
	bbq = Barbecue.find_by(id: params[:id])
	appt = bbq.appointments
	users = bbq.users
	render(json: [bbq , appt, users])
  end

end
