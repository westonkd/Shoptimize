class ItemsController < ApplicationController
  def change_purchase
    if session[:current_user].nil?
      redirect_to url_for(:controller => :login, :action => :index) and return
    end

    item = Item.find(params[:id])
    item.purchased=params[:purchased]
    item.save!

    puts "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    puts Item.find(params[:id]).purchased
    puts ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"

    render nothing: true
  end
end
