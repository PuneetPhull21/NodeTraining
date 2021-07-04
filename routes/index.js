var express = require('express');
var router = express.Router();
var fs = require('fs');
const getAccountData = () => {
  const jsonData = fs.readFileSync('routes/data.json');
  return (JSON.parse(jsonData));  
}
const saveAccountData = (data) => {
const stringifyData = JSON.stringify(data)
fs.writeFileSync('routes/data.json', stringifyData)
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Success', function(req, res, next) {
  res.render('Success');
});
router.post('/register',function(req,res,next){
var existAccounts = getAccountData();
    const Id = Math.floor(100000 + Math.random() * 900000)
   existAccounts[Id] = req.body;
   saveAccountData(existAccounts);
   const data = JSON.stringify(req.body);
   res.render('Success',{data:data,id:Id});

})
router.get('/login',function(req,res,next){
  res.render('login');
})










module.exports = router;
