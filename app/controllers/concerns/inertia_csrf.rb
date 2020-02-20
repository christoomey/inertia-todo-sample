module InertiaCsrf
  extend ActiveSupport::Concern

  included do
    before_action :set_csrf_cookie
  end

  private

  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token
  end
end
