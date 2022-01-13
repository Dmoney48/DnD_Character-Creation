const express = require('express')

const router = express.Router();

const Toon = require('../models/toons');

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
    // const productToAdd = {
    //     name: req.body.name,
    //     description: req.body.description,
    //     img: req.body.img,
    //     price: req.body.price,
    //     qty: req.body.qty
    // }
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
// router.get('/seed', async (req, res) => {
//     const newtoons =
//       [
//         {
//           name: 'Beans',
//           description: 'A small pile of beans. Buy more beans for a big pile of beans.',
//           img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/toons/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
//           price: 5,
//           qty: 99
//         }, {
//           name: 'Bones',
//           description: 'It\'s just a bag of bones.',
//           img: 'http://bluelips.com/prod_images_large/bones1.jpg',
//           price: 25,
//           qty: 0
//         }, {
//           name: 'Bins',
//           description: 'A stack of colorful bins for your beans and bones.',
//           img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
//           price: 7000,
//           qty: 1
//         }
//       ]
  
//     try {
//       const seedItems = await Toon.create(newtoons)
//       res.send(seedItems)
//     } catch (err) {
//       res.send(err.message)
//     }
//   })

  //SHOW
router.get('/:id', (req, res) => {
    Toon.findById(req.params.id, (error, foundToons) => {
        res.render('show.ejs', {toons: foundToons});
    })
})

module.exports = router;