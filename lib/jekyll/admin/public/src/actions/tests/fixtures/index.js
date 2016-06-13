export  const doc = {
  "id": "the-revenant",
  "collection_name": "movies",
  "document_id": "the-revenant",
  "body": "ha ha",
  "meta": {
    "layout": "default",
    "title": "The Revenant"
  }
};

export const documents = [
  {
    "id": "testing-posts",
    "collection_name": "posts",
    "document_id": "testing-posts",
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
    "document_id": "2016-05-29-google-summer-of-code",
    "body": "You’ll find this post in your `_posts` directory.",
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
    "document_id": "2016-01-01-some-post",
    "body": "You’ll find this post in your `_posts` directory.",
    "meta": {
      "layout": "post",
      "title": "Welcome to Jekyll!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "jekyll update"
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
  "page_id": "about",
  "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
  "meta": {
    "layout": "page",
    "title": "About",
    "permalink": "/about/"
  }
};
