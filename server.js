// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render("index");
  })

app.get('/quotes', function(req, res){
  Quote.find({}, function(err, quotes){
    console.log(quotes);
  res.render("main", {quotes: quotes});
  })
})

mongoose.connect('mongodb://localhost/quoting_dojo');

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})


app.post('/quotes', function(req, res){
  console.log("POST DATA", req.body);
  var quote = new Quote({name: req.body.name, quote: req.body.quote});

  quote.save(function(err){
    if(err) {
      console.log("Something went wrong");
      res.render("/")
    } else {
      console.log("Successfully added a quote");
      res.redirect("/quotes");
    }
  })
})


var QuoteSchema = new mongoose.Schema({
   name: String,
   quote: String
  })
  mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
  var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'
