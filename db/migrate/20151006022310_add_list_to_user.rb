class AddListToUser < ActiveRecord::Migration
  def change
    add_reference :users, :list, index: true, foreign_key: true
  end
end
