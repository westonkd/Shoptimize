class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email

      t.timestamps null: false
    end

    create_table :lists do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.timestamps null: false
    end

    create_table :items do |t|
      t.belongs_to :list, index: true
      t.string :group
      t.boolean :purchased
      t.timestamps null: false
    end
  end
end
