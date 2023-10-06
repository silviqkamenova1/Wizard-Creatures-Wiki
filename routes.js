const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController')
const wikiController = require('./controllers/wikiController')

router.use(homeController)
router.use(authController)
router.use('/wiki', wikiController)
router.all('*', (req, res) => {
    res.render('home/404')
})


module.exports = router