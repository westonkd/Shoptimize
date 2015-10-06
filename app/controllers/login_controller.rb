class LoginController < ApplicationController
  attr_accessor :email

  def login
    current_user = User.where("login = ?", params[:email]).first

    if current_user.nil?
      current_user = User.create(login: params[:email])
    end

    session[:current_user] = current_user

    redirect_to url_for(:controller => :lists, :action => :index) and return
  end
end
