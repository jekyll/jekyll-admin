export const doc = {
  id: "/movies/the-revenant",
  ext: ".md",
  slug: "the-revenant",
  collection: "movies",
  raw_content: "# Test Document",
  content: "Test Document",
  layout: "default",
  title: "The Revenant",
  path: "_movies/the-revenant.md"
};

export const documents = [
  {
    id: "testing-posts",
    collection: "posts",
    body: "You’ll find this post in your `_posts` directory.",
    layout: "post",
    title: "Testing Posts",
    date: "2016-05-20 01:10:46 +0300",
    categories: "test",
    draft: false
  },
  {
    id: "2016-05-29-google-summer-of-code",
    collection: "posts",
    body: "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.",
    layout: "post",
    title: "Google Summer of Code!",
    date: "2016-05-20 01:10:46 +0300",
    categories: "gsoc",
    draft: false
  },
  {
    id: "2016-01-01-some-post",
    collection: "posts",
    body: "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-rgenerates your site when a file is updated.",
    layout: "post",
    title: "Welcome to Jekyll!",
    date: "2016-05-20 01:10:46 +0300",
    categories: "jekyll update",
    draft: false
  }
];

export const movies = { collection_name: "movies", meta: {}};

export const page = {
  name: "about",
  content: "This is the base Jekyll theme.",
  layout: "page",
  title: "About",
  path: "about.md"
};

export const pages = [
  {
  name: "about.md",
    raw_content: "# Test",
    path: "about.md"
  },
  {
    name: "gsoc.md",
    raw_content: "# Test",
    path: "gsoc.md"
  },
  {
    name: "contact.md",
    raw_content: "# Test",
    path: "contact.md"
  }
];

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

export const staticfile = {
  extname: ".html",
  modified_time: "2016-08-11 23:40:41 +0300",
  path: "/index.html",
  encoded_content: "PGh0bWw+CiAgPGJvZHk+CiAgICBZb3UncmUgcHJvYmFibHkgbG9va2luZyBm"
};
