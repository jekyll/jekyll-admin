module Jekyll
  class Command
    class << self
      JEKYLL_ADMIN_OVERRIDES = {
        "watch"    => false,
        "detached" => false,
      }.freeze

      def configuration_from_options(options)
        options = Jekyll.configuration(options)
        jekyll_admin_configuration_monkey_patch(options)
      end

      def jekyll_admin_configuration_monkey_patch(options)
        JEKYLL_ADMIN_OVERRIDES.each do |key, value|
          options[key] = value
        end
        options
      end
    end
  end
end
