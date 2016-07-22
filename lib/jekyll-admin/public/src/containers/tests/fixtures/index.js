export const config = {
  "title": "Your awesome title",
  "email": "your-email@domain.com",
  "description": "Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.\n",
  "baseurl": "",
  "url": "http://yourdomain.com",
  "twitter_username": "jekyllrb",
  "github_username": "jekyll",
  "markdown": "kramdown"
};

export const collections = [
  {title: "Posts", path: "/posts" },
  {title: "Movies", path: "/movies"}
];

export const content = {
  body: "Body",
  meta: {
    title: "GSoC",
    layout: "post",
    path: "gsoc.md",
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
  }
};
