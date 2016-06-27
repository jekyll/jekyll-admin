export const doc = {
  "id": "the-revenant",
  "collection_name": "movies",
  "body": "ha ha",
  "meta": {
    "layout": "default",
    "title": "The Revenant",
    "path": "the-revenant.md"
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
      "categories": "test",
      "path": "testing-posts.md"
    }
  },
  {
    "id": "2016-05-29-google-summer-of-code",
    "collection_name": "posts",
    "body": "You’ll find this post in your `_posts` directory.",
    "meta": {
      "layout": "post",
      "title": "Google Summer of Code!",
      "date": "2016-05-20 01:10:46 +0300",
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
      "mentors": ["Ben Balter", "Jurgen Leschner", "Parker Moore"],
      "path": "2016-05-29-google-summer-of-code.md"
    }
  },
  {
    "id": "2016-01-01-some-post",
    "collection_name": "posts",
    "body": "You’ll find this post in your `_posts` directory.",
    "meta": {
      "layout": "post",
      "title": "Welcome to Jekyll!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "jekyll update",
      "path": "2016-01-01-some-post.md"
    }
  }
];

export const collections = [
  {
    "path": "/posts",
    "title": "Posts"
  },
  {
    "path": "/movies",
    "title": "Movies"
  }
];

export const page = {
  "id": "about",
  "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
  "meta": {
    "layout": "page",
    "title": "About",
    "permalink": "/about/"
  }
};

export const state = {
  body: 'Google summer of code is awesome',
  metadata: {
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
    mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
  },
  new_field_count: 0
};
