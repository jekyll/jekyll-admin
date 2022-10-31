export const config = {
  content: {
    title: 'Your awesome title',
    email: 'your-email@domain.com',
    baseurl: '',
    url: 'http://yourdomain.com',
    jekyll_admin: {
      header_buttons: [
        { title: 'Google', url: 'https://www.google.fr', icon: 'search' },
      ],
    },
  },
  raw_content:
    "title: Your awesome title\nemail: your-email@domain.com\nbaseurl:\nurl: http://yourdomain.com\njekyll_admin:\n  header_buttons:\n    - title: Google\n      url: 'https://www.google.fr'\n      icon: search",
};

export const collections = [
  {
    label: 'posts',
    path: '/posts',
  },
  {
    label: 'movies',
    path: '/movies',
  },
];

export const content = {
  content: 'Body',
  title: 'GSoC',
  layout: 'post',
  path: 'gsoc.md',
  categories: 'gsoc',
  students: [
    'GSoC Students',
    {
      name: {
        first: 'Mert',
        last: 'Kahyaoğlu',
      },
      email: ['mertkahyaoglu93@gmail.com', 'test@gmail.com'],
      username: 'mertkahyaoglu',
    },
    {
      name: {
        first: 'Ankur',
        last: 'Singh',
      },
      email: 'ankur13019@iiitd.ac.in',
      username: 'rush-skills',
    },
  ],
  mentors: ['Ben Balter', 'Jurgen Leschner', 'Parker Moore'],
};

export const notification = {
  title: 'Test',
  message: 'Testing notifications',
  level: 'success',
};
