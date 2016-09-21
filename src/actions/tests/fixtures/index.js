export const config = {
  title: 'Awesome Title',
  gems: 'jekyll-admin'
};

export const config_yaml = "title: Awesome Title\ngems: jekyll-admin";

export const collections = [
  {
    label: "posts",
    files: [],
    directory: "/jekyll-admin/spec/fixtures/site/_posts",
    relative_directory: "_posts",
    permalink: "/:categories/:year/:month/:day/:title:output_ext",
    http_url: null,
    api_url: "http://localhost:4000/_api/collections/posts"
  },
  {
    label: "puppies",
    files: [],
    directory: "/jekyll-admin/spec/fixtures/site/_puppies",
    relative_directory: "_puppies",
    foo: "bar",
    http_url: null,
    api_url: "http://localhost:4000/_api/collections/puppies"
  }
];

export const doc = {
  path: "_puppies/rover.md",
  id: "/puppies/rover",
  relative_path: "_puppies/rover.md",
  url: "/puppies/rover.html",
  collection: "puppies",
  draft: false,
  categories: [],
  some_front_matter: "default",
  title: "Rover",
  breed: "Golden Retriever",
  slug: "rover",
  ext: ".md",
  tags: [],
  date: "2016-08-31 23:02:41 +0300",
  http_url: null,
  api_url: "http://localhost:4000/_api/collections/puppies/rover.md"
};

export const collection = {
  label: "puppies",
  files: [],
  directory: "/jekyll-admin/spec/fixtures/site/_puppies",
  relative_directory: "_puppies",
  foo: "bar",
  http_url: null,
  api_url: "http://localhost:4000/_api/collections/puppies",
  documents: [doc]
};

export const new_doc = {
  collection: "movies",
  raw_content: "# Test Document",
  title: "The Revenant",
  path: "the-revenant.md",
  foo: "bar"
};

export const page = {
  name: "contact.md",
  raw_content: "# This is the base Jekyll theme.",
  dir: "/",
  http_url: "http://localhost:4000/page.html",
  path: "contact.md",
  front_matter: {
    foo: "bar"
  }
};

export const new_page = {
  raw_content: "# This is the base Jekyll theme.",
  path: "contact.md",
  title: "Contact",
  foo: "bar"
};

export const state = {
  body: 'Google summer of code is awesome',
  path: 'gsoc.md',
  title: 'Google Summer of Code',
  published: true,
  layout: "post",
  categories: "gsoc",
  students: [
    "GSoC Students",
    {
      name: {
        first: "Mert",
        last: "Kahyaoğlu"
      },
      email: [
        "mertkahyaoglu93@gmail.com",
        "test@gmail.com"
      ],
      username: "mertkahyaoglu"
    },
    {
      name: {
        first: "Ankur",
        last: "Singh"
      },
      email: "ankur13019@iiitd.ac.in",
      username: "rush-skills"
    }
  ],
  mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"],
  new_field_count: 0
};

export const datafile = {
  path: "_data/data_file.yml",
  relative_path: "_data/data_file.yml",
  slug: "data_file",
  ext: ".yml",
  title: "Data File",
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
