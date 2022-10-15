const express = require('express')
const fruits = require('./models/fruits')
const chips = require('./models/chips')
// Override default FORM METHODS (adds functionality to provide PUT and DELETE requests from the browser)
const methodOverride = require('method-override');
const { redirect, render } = require('express/lib/response');

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

// chips index
// All routes must Redirect OR Render

app.get('/chips', (req, res) => {
    res.render('chips/index.ejs', {
        chips: chips,
        title: "This is the Chips Page"
    })
});

app.get('/chips/new', (req, res) => {
    res.render('chips/new.ejs')
})

app.get('/chips/:id', (req, res) => {
    console.log(req.params)
    console.log(chips[req.params.id])
    res.render('chips/show.ejs', {
        chip: chips[req.params.id],
        chipsIndex: req.params.id
    });
});

app.get('/chips/:id/edit', (req, res) => {
    res.render('chips/edit.ejs', {
        chip: chips[req.params.id],
        chipsIndex: req.params.id
    })
})

app.put('/chips/:id', (req, res) => {
    console.log(req.body)
    chips[req.params.id] = req.body
    res.redirect('/chips')
});

app.post('/chips', (req, res) => {
    console.log(req.body)
    chips.push(req.body)

    let newChipIndex = chips.length - 1

    res.redirect('/chips/' + newChipIndex)
});

app.delete('/chips/:id', (req, res) => {
    chips.splice(req.params.id, 1); //remove the item from the array
    res.redirect('/chips')
});




//index
app.get('/fruits', (req, res) => {
    // res.send(fruits)
    res.render('fruits/index.ejs', {
        allFruits: fruits,
        title: 'index'
    })
})

//new
app.get('/fruits/new', (req, res) => {
    res.render('new.ejs')
})


//show
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray])
    res.render('fruits/show.ejs', {
        fruit: fruits[req.params.indexOfFruitsArray],
        title: 'show'
    })
})


// create
app.post('/fruits', (req, res) => {
    console.log(req.body)

    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }

    fruits.push(req.body)

    console.log(fruits)
    res.redirect('/fruits')
})

// delete
app.delete('/fruits/:indexOfFruitsArray', (req, res)  => {
    console.log("delete route")
    fruits.splice(req.params.indexOfFruitsArray, 1); //remove the item from the array
    res.redirect('/fruits'); //redirect back to index route
});

// edit
app.get('/fruits/:indexOfFruitsArray/edit', (req, res) => {
    res.render( 'fruits/edit.ejs', //render views/edit.ejs 
      {
        //pass in an object that contains
        fruit: fruits[req.params.indexOfFruitsArray], //the fruit object
        index: req.params.indexOfFruitsArray, //... and its index in the array
      }
    );
});

// Routing
// HTTP METHOD
// WHERE ARE WE SENDING THE REQUEST? FORM ACTION

// update
app.put('/fruits/:indexOfFruitsArray', (req, res) => {
    //:indexOfFruitsArray is the index of our fruits array that we want to change
    if (req.body.readyToEat === 'on') {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    fruits[req.params.indexOfFruitsArray] = req.body // in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
    res.redirect('/fruits'); //redirect to the index page
  })

app.listen(3000, () => {
    console.log('listening')
})
