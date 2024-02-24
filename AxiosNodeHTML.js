const path = require("path");
const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

// Base URL for the API
//const base_url = "https://api.example.com";
const base_url = "http://localhost:3000";

// Set the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static (__dirname + '/public'));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/musics');
        res.render("musics", { musics: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error root');
    }
});

app.get("/music/:id", async (req, res) => { 
    try {
        const response = await axios.get(base_url + '/musics/' + req.params.id);
        res.render("music", { music: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error get');
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {  
    try {
        const data={ title: req.body.title, singer: req.body.singer, genre: req.body.genre, release_date: req.body.release_date,  };
        await axios.post(base_url + '/musics', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error post');
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(
        base_url + '/musics/' + req.params.id);
        res.render("update", { music: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error get update');
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data={title: req.body.title, author: req.body.author };
        await axios.put(base_url + '/musics/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error post update');
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/musics/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error delete');
    }
});

app.listen(5500, () => {
    console.log('Server started on port http://localhost:5500');
    });
