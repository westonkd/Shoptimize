class Item < ActiveRecord::Base
  attr_accessor :name, :group, :purchased
  belongs_to :list
end
