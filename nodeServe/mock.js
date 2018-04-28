var express = require('express');
var router = express.Router();

router.get('/test', (req, res) => {
  // userNames = null
  res.json({
    state: 0,
    data: 'test'
  })
})

router.post('/testPost', (req, res) => {
  // userNames = null
  res.json({
    state: 0,
    data: 'post'
  })
})
module.exports = router;