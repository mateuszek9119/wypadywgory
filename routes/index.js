const express = require('express');
const router = express.Router();

const login = 'admin'
const password = '123'

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Wspólne przejazdy w góry' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie Admina' });
});

router.post('/login', (req, res) => {

  if(req.body.login === login && req.body.password === password){
    
    req.session.admin = 1
    res.redirect('/admin')
  }else{
    res.redirect('/login')
  }

});


module.exports = router;
