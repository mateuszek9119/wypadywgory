const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {

  const search = req.query.search || '';
  let sort = Number(req.query.sort)

  if (sort !== -1 && sort !== 1) {
    sort = 1
  }

  const findNews = News
      .find({title: new RegExp(search.trim(), 'i')})
      .sort({date: sort})
      //.select('_id, title, description')   wyberamy jakie pola mamy zwrocic jesli nie wszystkie 

  findNews.exec()
  .then(data =>  res.json(data))
  .catch(err => console.log(err))
});


// znajdowanie jednego artykułu: 
router.get('/:id', (req, res) => {

  const id = req.params.id

  const findNews = News.findById(id)
  //.select('_id, title, description')   wyberamy jakie pola mamy zwrocic jesli nie wszystkie

  findNews.exec()
  .then(data =>  res.json(data))
  .catch(err => console.log(err))

});

module.exports = router;
