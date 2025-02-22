const express = require('express');
const News = require('../models/news')
const router = express.Router();


// all - zawsze to sie odpali dla get post i innch (sprawdzi  czy jest admin czy nie dla kazdej operacji) * oznacza kazdy adres url

router.all('*', (req, res, next)=>{

  if(!req.session.admin){
    res.redirect('login')
    return
  }

  next()
})


/* GET home page. */
router.get('/', (req, res) => {

  News.find()
    .then(data=>{
      res.render('admin/index', { title: 'Admin' , data});
    })
    .catch(err=> console.log('Błąd wyszukiwania danych: ', err))
   
});


router.get('/news/add', (req, res) => {

  res.render('admin/news-form', { title: 'Dodaj przejazd', body: {} ,  errors: {} });
});


router.post('/news/add', (req, res) => {

  const body = req.body

  const newsData = new News(body)

  newsData.save()
    .then(() => {
      res.redirect('/admin')
    })
    .catch(function (errors) {
      res.render('admin/news-form', { title: "dodaj przejazd", errors, body })
    })

})



router.get('/news/delete/:id', (req, res) => {

  News.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect('/admin')
  })
  .catch(err=> console.log('Błąd usuwania przejazdu ', err))

});

module.exports = router;
