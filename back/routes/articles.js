const router = require('express').Router()
const {listArticlesByCategory, readArticle, createArticle, updateArticle, deleteArticle} = require('../controllers/articleController')

// List articles by type
router.get('/list/:category', listArticlesByCategory)


// read  article
router.get('/read/:id', readArticle)

// create aricle
router.post('/create' , createArticle)

// update artcle
router.put('/update/:id', updateArticle)


// delete article
router.delete('/delete/:id', deleteArticle)


module.exports = router