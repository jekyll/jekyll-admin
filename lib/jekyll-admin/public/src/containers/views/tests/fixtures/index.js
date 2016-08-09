export const config = {
  title: "Your awesome title",
  email: "your-email@domain.com",
  description: "Write an awesome description for your new site here.\n",
  url: "http://yourdomain.com"
};

export const doc = {
  id: "the-revenant",
  collection: "movies",
  raw_content: "## A frontiersman on a fur trading expedition in the 1820s fights.",
  layout: "default",
  title: "The Revenant",
  path: "the-revenant.md",
  draft: false,
  url: '/the-revenant.html',
  front_matter: {
    foo: "bar"
  }
};

export const page = {
  raw_content: "# Test Page",
  dir: "/",
  name: "page.md",
  path: "page.md",
  url: "/page.html",
  front_matter: {
    title: "Test Page"
  }
};

export const datafile = {
  data_file: {
    foo: "bar"
  }
};
