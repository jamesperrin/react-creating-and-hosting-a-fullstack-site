import express from 'express';

const hostname = process.env.host || 'localhost';
const port = process.env.port || 8000;

const app = express();
app.use(express.json());

let articlesInfo = [
  {
    name: 'learn-react',
    upvotes: 0,
    comments: [],
  },
  {
    name: 'learn-node',
    upvotes: 0,
    comments: [],
  },
  {
    name: 'learn-mongodb',
    upvotes: 0,
    comments: [],
  },
];

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.put('/api/articles/:name/upvote', (req, res) => {
  const { name } = req.params;

  const article = articlesInfo.filter((a) => a.name === name);
  if (article) {
    article.upvotes++;

    res.send(`The ${article.name} article now has ${article.upvotes} upvotes.`);
  } else {
    res.send(`The article doesn't exist.`);
  }
});

app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articlesInfo.find((a) => a.name === name);

  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send("That article doesn't exist!");
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is listening on port http://${hostname}:${port} `);
});
