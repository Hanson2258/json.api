const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)

app.get('/recipe', (req, res) => {
    res.status(200).send({
        name: 'World\'s Best Lasagna\n',
        url: 'https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/'
    })
});

app.post('/recipe/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { url } = req.body;

    if (!name) {
        res.status(418).send({ message: 'We need a recipe name!'})
    }
    else if (!url) {
        res.status(418).send({ message: 'We need a url for the recipe!!'})
    }
    res.send({
        recipe_id: `The recipe you submitted has an id of: ${id}`,
        recipe_name: `The name for the recipe is: ${name}`,
        recipe_url: `the url for the recipe is ${url}`
    })
});