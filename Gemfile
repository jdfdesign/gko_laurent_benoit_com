source 'https://rubygems.org'
ruby "1.8.7"

group :assets do
  gem 'sass', '= 3.2.14'
  gem 'sass-rails', '~> 3.2.6'
  gem 'coffee-rails', '~> 3.2.2'
  gem 'uglifier', '~> 2.4.0'
end

gem 'bcrypt', '= 3.1.10'
gem 'mysql2', '= 0.3.18'

group :production do
  git "git@github.com:jdfdesign/gko_cms3.git", :tag => "v0.8.43" do
     gem 'gko_core'
     gem 'gko_auth'
     gem 'gko_inquiries'
     gem 'gko_albums'
     gem "gko_categories"
  end
end

#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_albums", :path => '~/Github/gko_cms3/gko_albums'
#end
