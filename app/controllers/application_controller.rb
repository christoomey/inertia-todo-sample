class ApplicationController < ActionController::Base
  include InertiaCsrf

  before_action :random_sleep, if: :development?

  private

  def random_sleep
    sleep rand(0.1..0.35)
  end

  def development?
    Rails.env.development?
  end
end
