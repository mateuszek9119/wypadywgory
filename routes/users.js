const express = require('express');

const router = express.Router();
const News = require('../models/news')

router.all('*', (req, res, next) => {

  next()
});

/* GET home page. */

router.get('/', (req, res, next) => {

  News.find()
    .then(data => { 
      res.render('users/index', { title: 'Users', data });
    })
    .catch(err => console.log("Błąd wyszukiwania danych : ", err))

});

const minDate = new Date().toISOString().slice(0,10)


router.get('/news/add', (req, res) => {
  res.render('users/transit-form', { title: "dodaj przejazd", body: {}, minDate, err: {} })
})

// Multer setup for file uploads (in memory)

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/news/add',  upload.single('image'), (req, res) => {

  const obj = {
        cityStart: req.body.cityStart,
        cities: req.body.cities,
        cityEnd: req.body.cityEnd,
        dateStartTransit: req.body.dateStartTransit,
        dateReturnTransit: req.body.dateReturnTransit,
        user: req.body.user,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        },
        contact: req.body.contact,
        description: req.body.description,
        citiesAll: `${req.body.cityStart} ${req.body.cities} ${req.body.cityEnd}`
    };

  const newsData = new News(obj)

  const body = req.body

  newsData.save()
    .then(() => {
      res.redirect('/news')
    })
    .catch(function (err) {
      res.render('users/transit-form', { title: "dodaj przejazd", err, body })
    })
    
})


module.exports = router;
