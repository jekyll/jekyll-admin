export const config = {
  content: {
    title: "Your awesome title",
    email: "your-email@domain.com",
    baseurl: "",
    url: "http://yourdomain.com"
  },
  raw_content: "title: Your awesome title\nemail: your-email@domain.com\nbaseurl:\nurl: http://yourdomain.com"
};

export const doc = {
  id: "the-revenant",
  collection: "movies",
  raw_content: "## A frontiersman on a fur trading expedition in the 1820s fights.",
  layout: "default",
  title: "The Revenant",
  path: "the-revenant.md",
  draft: false,
  http_url: '/the-revenant.html',
  slug: 'the-revenant',
  name: 'the-revenant.md',
  date: '2016-03-01 00:00:00 +0200',
  front_matter: {
    foo: "bar"
  }
};

export const page = {
  raw_content: "# Test Page",
  dir: "/",
  name: "page.md",
  path: "page.md",
  http_url: "/page.html",
  front_matter: {
    title: "Test Page"
  }
};

export const datafile = {
  path: "_data/books/authors.yml",
  relative_path: "books/authors.yml",
  slug: "authors",
  ext: ".yml",
  title: "Authors",
  raw_content: "foo: bar\n",
  content: {
    foo: "bar"
  }
};

export const staticfile = {
  extname: ".html",
  modified_time: "2016-08-11 23:40:41 +0300",
  path: "/index.html",
  encoded_content: "PGh0bWw+CiAgPGJvZHk+CiAgICBZb3UncmUgcHJvYmFibHkgbG9va2luZyBm"
};
