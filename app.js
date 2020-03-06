const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/recipes', function getRecipes(req, res) {
  const contents = fs.readFileSync('./pies.json');
  res.send(JSON.parse(contents));
});

app.get('/load-recipes', (req, res) => {
  fetch('https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=pie')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fs.writeFileSync('./pies.json', JSON.stringify(data.hits));
      });
});
