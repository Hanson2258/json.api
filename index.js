const express = require('express');
const app = express();
const PORT = 8080;
const data = require('C:\\Users\\Hanso\\Documents\\GitHub\\json.api\\recipe.json')
const FileSystem = require("fs");
const fs = require("fs");
const {json} = require("express");

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)

app.get('/recipe', function (req, res) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data));
});

app.post('/recipe', (req, res) => {
    const id = getNextID();
    const {name} = req.body;
    const {url} = req.body;

    let newRecipe = {
        "id": id,
        "name": name,
        "url": url
    }

    if (!name) {
        res.status(418).send({ message: 'We need a recipe name!'})
    }
    else if (!url) {
        res.status(418).send({ message: 'We need a url for the recipe!!'})
    }
    res.send({
        recipe_id: `The recipe you submitted has an id of: ${id}`,
        recipe_name: `The name for the recipe is: ${name}`,
        recipe_url: `the url for the recipe is ${url}`,
    })

    writeToJSONFile(newRecipe);
});

function getNextID() {
    const fs = require('fs');
    let fileText = fs.readFileSync('C:\\Users\\Hanso\\Documents\\GitHub\\json.api\\recipe.json');
    let jsonParsed = JSON.parse(fileText);

    return jsonParsed.length + 1;
}

function writeToJSONFile(newRecipe) {
    const FileSystem = require("fs");

    let fileText = fs.readFileSync('C:\\Users\\Hanso\\Documents\\GitHub\\json.api\\recipe.json');
    let recipeData = JSON.parse(fileText);

    recipeData.push({
        "id": newRecipe["id"],
        "name": newRecipe["name"],
        "url": newRecipe["url"]
    });

    FileSystem.writeFile('recipe.json', JSON.stringify(recipeData), (error) => {
        if (error) throw error;
    });
}