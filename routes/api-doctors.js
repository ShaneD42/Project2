const express = require('express');
const router = express.Router();
const modals = require('../models/index');
const db = modals.doctor;   

    
    router.get('/api/doctors', function(req, res){

        db.findAll({}).then(function(doctors){
        
        res.json(doctors)
        console.log(doctors)
        
    });

    });

    router.get('/search', (req, res) => {
        let { term } = req.query;
    
        // Make lowercase
        term = term.toLowerCase();
    
        db.Doctor.findAll({ where: { speciality: { [Op.like]: '%' + term + '%' } } })
        .then(doctors => res.render('doctors', { doctors }))
        .catch(err => res.render('error', {error: err}));
    });


    module.exports = router