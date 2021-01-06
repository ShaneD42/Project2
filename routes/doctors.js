
const express = require('express');
const router = express.Router();
const modals = require('../models/index');
const db = modals.doctor;
const connection = require('../config/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;





router.get('/', (req, res) => {//res.render('doctors'));

db.findAll() 
    .then(doctors =>res.render('doctors',{
        doctors
    }))
   .catch(err =>res.render('error',{error:err}))
});

router.get('/api/doctors', function(req, res){

    db.findAll({
      
    }).then(function(doctors){
    
    res.json(doctors)
    console.log(doctors)
    
});

});

router.get('/welcome', (req, res) => res.render('welcome'));

router.get('/add', (req, res) => res.render('add'));

router.post('/add', (req,res) => {
   
   let {name,email,phone,zipcode,city,state,speciality} = req.body;

   db.create({
    name,
    email,
    phone,
    zipcode,
    city,
    state,
    speciality
   })
    .then(db => res.redirect('/doctors'))
    .catch(err => console.log(err))
})



// router.get('/search', (req, res) => {
//         let { term } = req.query;
    
//         // Make lowercase
//         term = term.toLowerCase();
    
//         db.findAll({ 
//             where: { speciality: { [Op.like]: '%' + term + '%' } },
//             where: { zipcode: { [Op.like]: '%' + term + '%' } }})
//         .then(doctors => res.render('doctors', { doctors }))
//         .catch(err => res.render('error', {error: err}));
//     });
  
router.get('/search', (req, res) => {
    let { term } = req.query;
  
    // Make lowercase
    term = term.toLowerCase();
  
    db.findAll({ where: { speciality: { [Op.like]: '%' + term + '%' } } })
      .then(doctors => res.render('doctors', { doctors }))
      .catch(err => res.render('error', {error: err}));
  });
  

module.exports = router