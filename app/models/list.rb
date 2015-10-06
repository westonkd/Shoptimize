class List < ActiveRecord::Base
  attr_accessor :name
  belongs_to :user
  has_many :items
end
