class UsersController < ApplicationController

  def index
    # page  = params[:page].to_i || 1

    # @users = User.visible.select(:id, :name, :email).page(page)
  end

  def new
    @user = User.new
  end

  def create
    new_user_info = params.require(:user).permit(:name, :email, :password)
    @user = User.new(new_user_info)

    if !@user.save
      render :new
    else
      redirect_to('login')
    end
  end

  def login
    @cat = User.new()
  end



end
