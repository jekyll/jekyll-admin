export const collection = {
  "id": "the-revenant",
  "collection_name": "movies",
  "body": "A frontiersman on a fur trading expedition in the 1820s fights.",
  "meta": {
    "layout": "default",
    "title": "The Revenant"
  }
};

export const documents = [
  {
    "id": "testing-posts",
    "collection_name": "posts",
    "body": "You’ll find this post in your `_posts` directory.",
    "meta": {
      "layout": "post",
      "title": "Testing Posts",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "test"
    }
  },
  {
    "id": "2016-05-29-google-summer-of-code",
    "collection_name": "posts",
    "body": "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.",
    "meta": {
      "layout": "post",
      "title": "Google Summer of Code!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "gsoc"
    }
  },
  {
    "id": "2016-01-01-some-post",
    "collection_name": "posts",
    "body": "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.",
    "meta": {
      "layout": "post",
      "title": "Welcome to Jekyll!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "jekyll update"
    }
  }
];

export const movies = { collection_name: "movies", meta: {}};

export const page = {
  "id": "about",
  "body": "This is the base Jekyll theme.",
  "meta": {
    "layout": "page",
    "title": "About",
    "permalink": "/about/"
  }
};

export const pages = [
  {
    "id": "about",
    "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
    "meta": {
      "layout": "page",
      "title": "About page",
      "permalink": "/about/"
    }
  },
  {
    "id": "gsoc",
    "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
    "meta": {
      "layout": "page",
      "title": "GSoC",
      "permalink": "/gsoc/"
    }
  },
  {
    "id": "contact",
    "body": "This is the base Jekyll theme.",
    "meta": {
      "layout": "page",
      "title": "Contact Page",
      "permalink": "/gsoc/"
    }
  }
];

export const meta = {
  "layout": "post",
  "categories": "gsoc",
  "students": [
    {
      "name": "Mert Kahyaoğlu",
      "email": "mertkahyaoglu93@gmail.com",
      "username": "mertkahyaoglu"
    },
    {
      "name": "Ankur Singh",
      "email": "ankur13019@iiitd.ac.in",
      "username": "rush-skills"
    }
  ],
  "mentors": ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
};
