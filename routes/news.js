const express = require('express');
const router = express.Router();
const News = require('../models/news')


const minDate = new Date().toDateString()


/* GET home page. */
router.get('/', (req, res) => {

  const search = req.query.search || ''

  const findNews = News.find({ citiesAll: new RegExp(search.trim(), 'i')}).sort({date: -1} )


  findNews.exec()
  .then(data=>{
    res.render('news', { title: 'PRZEJAZDY: ' , data, search, minDate})
  })
  .catch(err=> console.log(err))

});

module.exports = router;
