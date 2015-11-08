class AddFriendlyNameToList < ActiveRecord::Migration
  def change
    add_column :lists, :friendly_name, :string
  end
end
