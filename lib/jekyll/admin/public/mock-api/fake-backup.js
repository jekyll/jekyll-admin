var fakeDB = {
  "collections": [
    {title: "Posts", path: "/posts" },
    {title: "Movies", path: "/movies"}
  ],
  "posts": { "collection_name": "posts", "meta": {}},
  "movies": { "collection_name": "movies", "meta": {}},
  "documents": {
    "posts": [
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
    ],
    "movies": [
      {
        "id": "the-revenant",
        "collection_name": "movies",
        "document_id": "the-revenant",
        "body": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
        "meta": {
          "layout": "default",
          "title": "The Revenant"
        }
      }
    ]
  },
  "pages": [
    {
      "id": "about",
      "page_id": "about",
      "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
      "meta": {
        "layout": "page",
        "title": "About",
        "permalink": "/about/"
      }
    },
    {
      "id": "gsoc",
      "page_id": "gsoc",
      "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
      "meta": {
        "layout": "page",
        "title": "GSoC",
        "permalink": "/gsoc/"
      }
    },
    {
      "id": "contact",
      "page_id": "contact",
      "body": "This is the base Jekyll theme.",
      "meta": {
        "layout": "page",
        "title": "Contact Page",
        "permalink": "/gsoc/"
      }
    }
  ],
  "configuration": {
    "title": "Your awesome title",
    "email": "your-email@domain.com",
    "description": "Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.\n",
    "baseurl": "",
    "url": "http://yourdomain.com",
    "twitter_username": "jekyllrb",
    "github_username": "jekyll",
    "markdown": "kramdown"
  },
  "static_files": [
    {
      "id": "awesome-path",
      "path": "awesome-path"
    },
    {
      "id": "awesome-path/awesome-file.txt",
      "path": "awesome-path/awesome-file.txt"
    }
  ],
  "data": [
    {
      "id": "members",
      "data_file": "members"
    }
  ],
  "git": {
    "remote": "https://github.com/jekyll/jekyll.git",
    "branch": "awesome-branch"
  }
};

module.exports = fakeDB;
