const { appKey, appId } = require('./api_key.js');
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
  fetch(`https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=pie`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      console.log('Successful response from api.edamam.com');
      return response.json();
    })
    .then((data) => {
      fs.writeFileSync('./pies.json', JSON.stringify(data.hits));
      console.log('New recipe data successfully written to ./pies.json');
      res.send(data.hits);
    })
    .catch((error) => {
      console.error('There has been a problem fetching data from api.edamam.com:', error);
    });
});
