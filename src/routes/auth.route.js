const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  res.json({
    test: 'login ok',
  });
});

router.post('/register');

module.exports = router;
