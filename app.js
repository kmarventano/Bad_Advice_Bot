/*
* Bad advice answers user's questions with hilariously
* awful advice
*/

/*
 * Chat box logic, takes a question and returns the advice
 */
function getAdvice(question) {
    return "Eat them";
}

// Bring in the modules
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");


// Create the app
const app = express();

// Express static setup
app.use(express.static(path.join(__dirname, 'public')));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: false }));


// HBS setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Bots text
const botText = ["Hi! I'm the bad advice bot, ask me for some advice!"];

// User text
const userText = [];

// Log method and path
app.use(function(req, res, next) {
    console.log(req.method, req.path);
    next();
});

// Get for homepage path
app.get('/', function(req, res) {
    res.render('home', {botText: botText, userText: userText});

});

// Post for homepage path
app.post('/', function (req, res) {
    // Get the user's question
    const question = req.body.userQ;
    
    // Find the advice to give
    const advice = getAdvice(question);
    console.log(advice);

    // Add the advice to the chat boxes conversation and question to user's text
    botText.push(advice);
    userText.push(question);
    res.redirect('/');
});

// Listen in on 3000
app.listen(3000);

