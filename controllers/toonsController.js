const express = require('express')

const router = express.Router();

const Toon = require('../models/toons');

router.use(express.static('public'));//
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// CONTROLLERS
//INDEX
router.get('/', (req, res) => {

   Toon.find({}, (err, allToons) => {
        res.render('index.ejs', {
            toons: allToons
        })
    })
})// fine

//NEW
router.get('/new', (req, res) => {
    res.render('new.ejs'); //change to render
}) //fine



//CREATE
router.post('/', (req, res) => {
    // console.log(req.body);
    
    Toon.create(req.body, (error, createdToon) => {
        if(error){
            console.log(error);
            res.send(error);
        } else{
            console.log(createdToon);
            res.redirect('/toons');
        }
    })

    const toonToAdd = {
        class: req.body.class,
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        str: req.body.str,
        dex: req.body.dex,
        con: req.body.con,
        int: req.body.int,
        wis: req.body.wis,
        charm: req.body.charm
    }
    
})

//DELETE
router.delete('/:id', (req, res) => {
    Toon.findByIdAndDelete(req.params.id, (err, deletedToon) => {
        //findByIdAndDelete will delete a document with a given id
        if(err){
            console.log(error);
            res.send(error);
        } else {
            //redirect to the index page if the delete is successful
            res.redirect('/toons');
        }
    })
})
//EDIT
router.get('/:id/edit', (req, res) => {
    Toon.findById(req.params.id, (error, foundToons) => {
        if(error) {
            console.log(error);
            res.send(error)
        } else {
            res.render('edit.ejs', {
                toons: foundToons
            })
        }
    })
    
})
//UPDATE
router.put('/:id', (req, res) => {
    console.log(req.body);
    Toon.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedToon) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            console.log(updatedToon);
            res.redirect('/toons');
        }
    })
})


//SEED 
router.get('/seed', async (req, res) => {
    const newToons =
      [
        {
        class: "Fighter",
        name: "John Smith",
        description: "A valiant warrior of unmatched strength",
        img: "img/Male_Fighter.jpeg",
        str: 14,
        dex: 10,
        con: 17,
        int: 8,
        wis: 10,
        charm: 12
        }, {
        class: "Rogue",
        name: 'Dusty Bones',
        description: 'A shadowy figure with a stealthy approach',
        img: "img/Male_Rogue.webp",
        str: 12,
        dex: 18,
        con: 12,
        int: 8,
        wis: 10,
        charm: 16
        }, {
        class: "Sorcerer",
        name: 'Jaina Menethil',
        description: 'Sorceress Supreme, big attitude bigger spells',
        img: "img/Female_Sorcerer.jpeg",
        str: 6,
        dex: 9,
        con: 14,
        int: 8,
        wis: 12,
        charm: 17
        }
      ]
  
    try {
      const seedItems = await Toon.create(newToons)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })


  //SHOW
router.get('/:id', (req, res) => {
    Toon.findById(req.params.id, (error, foundToons) => {
        res.render('show.ejs', {toons: foundToons});
    })
})

module.exports = router;