class ListsController < ApplicationController
  def index
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end
    @list_map = Hash.new
    @user = session[:current_user]
    @lists = List.where("user_id = #{@user['id']}")

    @lists.each do |list|
      @list_map[list.id] = list.items[1..3]
    end
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
    @list_items = @current_list.items.sort_by { |item| item.group }
    @date =  @current_list.created_at.to_date
  end

  def fetch_items
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    @current_list = List.find(params[:id].to_i)
    @list_items = @current_list.items.sort_by { |item| item.group }

    render json: @list_items
  end

  def save_name
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    list_to_edit = List.find(params[:id].to_i)
    list_to_edit.name = params[:name]
    list_to_edit.save!

    render nothing: true
  end

  def add_item
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    @current_list = List.find(params[:id].to_i)
    Item.create(name: params[:name].downcase, group: params[:category].downcase, list: @current_list, purchased: false)

    render nothing: true
  end
end
