// First, we'll need Express
const express = require('express'); // this line imports the express library.
const app = express(); // this line call the function that is imported from line 1 and store it in the variable 'app'

// Middleware to log requests (optional but helpful for understanding)
app.use((req, res, next) => { // use the app.use method with the parameters request, response and next, this is gonna be used to execute every request made to the server
    console.log(`Request received: ${req.method} ${req.url}`); //  ${req.url} this property ise used to contain the url of the incoming request and the req.method is the property that is going to cantains the method that we get it could be post, put, delete etc.
    next(); 
}); // Pass control to the next middleware/route handler

// Custom middleware to validate username (optional enhancement)
const validateUsername = (req, res, next) => {
    const username = req.params.username;
    if (!username || username.length < 2) { // this is saying that if there is no username or username is less than 2 letters send an error 
        return res.status(400).send('Username must be at least 2 characters long'); // the  return res.status(400 is letting the client know that it was a bad request
    }
    next(); // this is going to take me to the next middleware after finishing the first one, if not used it is going to be left hanging
};

// Route to handle greetings
app.get('/greetings/:username', validateUsername, (req, res) => { // this line is listening for a get request at the path /greetings/:username.
    const username = req.params.username; // this lines is for when the client puts a value in username it will be availaible in the req.params.username
    
    // Array of greeting templates
    const greetings = [
        `Hello there, ${username}!`,
        `What a delight it is to see you once more, ${username}.`,
        `Welcome, ${username}!`,
        `Greetings, dear ${username}!`
    ];
    
    // Pick a random greeting
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    res.send(randomGreeting);
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

// Error handling middleware
app.use((err, req, res, next) => {  // this line starts the error handling function 
    console.error(err.stack); // this line is used to trace any errors i could have done earlier in my code
    res.status(500).send('Something broke!'); // this line is letting the client know that something went wrong on the server side
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 
// more notes
// the request object is used to contain details about the http request examples Headers, body url etc 
// the response object just take responses made by the http that will be sent back to the client  
// the next function is a fucntion that when called it passes control to the next middleware function if you dont use this function what is gonna happen is that the request is going
// to be left hanging.
// Math.random():

// Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
// This means it can give you any decimal number like 0.2, 0.8, 0.9999, etc., but never exactly 1.
// Math.random() * greetings.length:

// This takes the random number and multiplies it by greetings.length.
// greetings.length is just the number of items in the greetings array, which in this case is 4 (since there are 4 greetings).
// So, if Math.random() gave us 0.4567, then Math.random() * 4 would give us something like:

// 0.4567 * 4 = 1.827

// Math.floor():

// Math.floor() is a function that rounds down the decimal number to the largest whole number less than or equal to it.
// So, if we apply Math.floor() to 1.827:

// Math.floor(1.827) will give us 1.
// And if Math.random() * 4 gave us something like 3.999, Math.floor(3.999) would give us 3.

// so in summary 
// The random number from Math.random() gives a value that can be spread across the entire range of the array (0 to 3).
// Math.floor() ensures that we always get a valid index in the array, even if the number is a decimal.


// import the express framework
const express = require('express');
const app = express();

app.get('/roll/:number', (req, res) => { // this is going to be the route of the number generated 
  const number = parseInt(req.params.number); // this where the number is going to be saved for later use, the purporse of parsInt is to let the program know that it only can use numbers and if is not a number is going to return NaN as well that the number is an interger and is not a string 

  if (isNaN(number) || number < 0) {
    return res.status(400).json({ error: 'You must specify a positive number.' });
  }

  const rolledNumber = Math.floor(Math.random() * (number + 1));
  // res.json converts complex data to simpler data that oher programs or clients can understand
        //   key/property  value        
  res.json({ rolled: rolledNumber });
});

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


const express = require('express'); // this line imports the express library.
const app = express(); // this line call the function that is imported from line 1 and store it in the variable 'app'

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  
  // Route for /collectibles/:index
  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
  
    // Validate if the index corresponds to an item in the array
    if (index >= 0 && index < collectibles.length) {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`);
    } else {
      res.send('This item is not yet in stock. Check back soon!');
    }
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  const express = require('express');
const app = express();

// Route for /shoes with filtering
app.get('/shoes', (req, res) => {
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

  let filteredShoes = shoes;

  // Filter by min price
  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }

  // Filter by max price
  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }

  // Filter by type
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Sample data
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];



//.filter() is an array method that returns a new array with all the elements that 
// pass a certian condition
// filteredShoes.filter(): This is an array method that creates a new array with all elements that pass a test (provided as a function)
// parseFloat vs parseInt
// parse float is used to convert strings into intergers on how they are 
// for example if the string is '3.45' is going to convert it to a numeric value of 3.45 
// compared to parseInt, if the string is '3.45' is going to round it up to the numeric value of 3 
// so parseInt would not be ideal for this coding block 
// const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query; this is called object destrcuting and
// what is doing is that is you're using object destructuring to extract specific properties from req.query 
// and assign them to individual variables.
// 'min-price': minPrice: This is renaming the query parameter 'min-price' to a variable minPrice. The value of the 'min-price' 
// query parameter will be assigned to the variable minPrice.
// 'max-price': maxPrice: Similarly, this will assign the value of 'max-price' from req.query to a variable maxPrice.
// type: This extracts the value of the 'type' query parameter from req.query and assigns it to the variable type