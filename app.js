/*
* Bad advice answers user's questions with hilariously
* awful advice
*/


/*
* Key words for targeted advice
*/
const targetedAnswers = {
    "boyfriend": "A",
    "girlfriend": "B",
    "husband": "C",
    "wife": "D",
    "friend": "E",
    "dinner": "F",
    "breakfast": "G",
    "lunch": "H",
    "move": ""
};

/*
 * Random advice for when the bot doesn't know what to say
 */
const randomAnswers = ["I don't know", "Why are you asking me, I'm a bot",
"Try asking me later", " ¯\_(ツ)_/¯", "Whatever", "Microwave it!",
"If your significant other is making you cry everyday, ask yourself, 'Am I dating a human or an onion?'", 
"You should talk to your cat about it", "I wish I could help, but I'm a bot with no free will nor any life experiences",
"Have you tried putting a stocking over the end of a vacuum to find tiny items like earrings?", 
"I think your dog knows the answer to this question", "Do you have no one else to talk to?", 
"According to a survey I found online, people in your situation usually eat a tub of ice cream while crying to 'The Notebook'"];

/*, "
 * Chat box logic, takes a question and returns the advice
 */
function getAdvice(question) {
    var words = question.split(" ");

    for (var i = 0; i < words.length; i++){
        const w = words[i].toLowerCase();

        if (targetedAnswers[w] != undefined){
            return targetedAnswers[w];
        }
    }

    return randomAnswers[Math.floor((Math.random() * (randomAnswers.length - 1)))];
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

