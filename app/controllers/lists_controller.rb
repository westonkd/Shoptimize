class ListsController < ApplicationController
  def index
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    @user = session[:current_user]
    @lists = List.where("user_id = #{@user['id']}")
  end

  def create
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    new_list = List.create(user_id: session[:current_user]['id'])

    redirect_to url_for(:controller => :lists, :action => :edit, id: new_list.id) and return
  end

  def edit
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    @current_list = List.find(params[:id].to_i)
  end
end
