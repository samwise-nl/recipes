const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/recipes', function getRecipes(req, res) {
  const contents = fs.readFileSync('./recipes.json');
  res.send(JSON.parse(contents));
});
