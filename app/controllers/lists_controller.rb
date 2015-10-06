class ListsController < ApplicationController
  def index
    puts "postvars"
    puts params
    @email = session[:current_user]['id']
  end
end
