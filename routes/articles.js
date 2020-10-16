const router = require('express').Router()
const {listArticlesByCategory, readArticle, createArticle, updateArticle, deleteArticle} = require('../controllers/articleController')
const verifToken = require('../validators/tokens')

// List articles by type
router.get('/list/:category', listArticlesByCategory)


// read  article
router.get('/read/:id', readArticle)

// create aricle
router.post('/create' , verifToken, createArticle)

// update artcle
router.put('/update/:id', verifToken, updateArticle)


// delete article
router.delete('/delete/:id', verifToken, deleteArticle)



module.exports = router