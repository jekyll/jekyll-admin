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

export const page = {
  name: "about",
  content: "<h1>This is a test content.</h1>",
  raw_content: "# This is a test content.",
  layout: "page",
  title: "About",
  path: "about.md"
};

const page1 = {
  name: "gsoc",
  content: "<h1>This is a test content.</h1>",
  raw_content: "# This is a test content.",
  layout: "page",
  title: "GSoC",
  path: "gsoc.md"
};

const directory = {
  name: "page-dir",
  modified_time: "2017-01-28 19:23:16 +0200",
  path: "page-dir",
  type: "directory",
  http_url: null,
  api_url: "http://localhost:4000/_api/pages/entries/page-dir"
};

export const page_entries = [page, page1, directory];
export const collection_entries = [doc, directory];

export const meta = {
  layout: "post",
  categories: "gsoc",
  students: [
    {
      name: "Mert Kahyaoğlu",
      email: "mertkahyaoglu93@gmail.com",
      username: "mertkahyaoglu"
    },
    {
      name: "Ankur Singh",
      email: "ankur13019@iiitd.ac.in",
      username: "rush-skills"
    }
  ],
  mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
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

export const data_files = [datafile, directory];

export const staticfile = {
  extname: ".html",
  modified_time: "2016-08-11 23:40:41 +0300",
  path: "/index.html",
  encoded_content: "PGh0bWw+CiAgPGJvZHk+CiAgICBZb3UncmUgcHJvYmFibHkgbG9va2luZyBm"
};

export const notification = {
  title: 'Test',
  message: 'Testing notifications',
  level: 'success'
};
