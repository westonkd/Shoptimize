class User < ActiveRecord::Base
  attr_accessor :email
  has_many :lists
end
