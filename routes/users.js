var express = require("express");
var router = express.Router();
var fs = require('fs')

const getAccountData = () => {
  const jsonData = fs.readFileSync('routes/data.json');
  return (JSON.parse(jsonData));  
}
const saveAccountData = (data) => {
const stringifyData = JSON.stringify(data)
fs.writeFileSync('routes/data.json', stringifyData)
}
/* GET users listing. */

router.get('/edituser/:id',function(req,res,next){
  res.render('edituser',{id:req.params.id});
})
router.put('/edituser/:id',function(req,res,next){
  var existAccounts = getAccountData()
  fs.readFile('routes/data.json', 'utf8', (err, data) => {
    const Id = req.params.id;
    existAccounts[Id] = req.body;
    saveAccountData(existAccounts);
    res.json(`accounts with id ${Id} has been updated`)
  }, true);
})
router.delete('/edituser/delete/:id',function(req,res){
  fs.readFile('routes/data.json', 'utf8', (err, data) => {
    var existAccounts = getAccountData()
    const Id = req.params.id;
    delete existAccounts[Id]; 
    saveAccountData(existAccounts);
    res.render('index');
  }, true);
})
router.get('/:id',function(req,res,next){
  fs.readFile('routes/data.json','utf8',function(err,data){
    if(err) throw err;
    const array = JSON.parse(data);
    res.render('Users',{items:array[req.params.id],id:req.params.id});
    
  })

})



module.exports = router;
