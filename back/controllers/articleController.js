const Article = require('../models/Article')


module.exports.listArticlesByCategory = async (req, res) => {
    if(!req.params.category) return res.status(400).send('Article type missing on the request : news ? infomation ? classActivity ?')
    
    try {
            let articles = await Article.find({category:req.params.category})
            !articles ? res.status(400).send(`Il n'a pas de ${req.params.category}`) : res.status(200).send(articles)

    } catch (err) {
        res.status(400).send(err)
    }
  
}

// read article
module.exports.readArticle = async (req, res) => {
   if (!req.params.id) return res.status(400).send('Vous vous etes trompé de page')
   
   try {
        let article = await Article.find({_id:req.params.id})
        !article ? res.status(400).send(`L'article n'existe pas `) : res.status(200).send(article)
   }catch(err) {
        res.status(400).send(err)
   }
}
// create article
module.exports.createArticle = async (req, res) => {
   if (!req.body.title || !req.body.category || !req.body.target || !req.body.content || !req.body.modelArticle ) 
   { return res.status(400).send('Missing datas , please complete the form')}
   
    let article = new Article({
        title : req.body.title ,
        category: req.body.category,
        target: req.body.target,
        content: req.body.content,
        modelArticle: req.body.modelArticle
   })
try {
    const articlePosted = await article.save()
     articlePosted ?  res.status(200).send(`${articlePosted} saved in data base`) : 
                      res.status(400).send('there was a problem')
    

} catch(err){ return res.status(400).send(err.message) }
   
}

module.exports.updateArticle = async (req, res) => {
   
    // avec le token , on verfiera qui modifie l'article
    
    try {
        let update = await Article.findOneAndUpdate({_id:req.params.id},req.body)
        let updated = await Article.findOne({_id:req.params.id})
        !update ? res.status(400).send('Update was not considered. Article not found') :  res.status(200).send(updated) 
    } catch(err){
        res.status(400).send(` ${err} est une erreur`)
    }

} 

module.exports.deleteArticle = async (req, res) => {

        // avec le token , on verfiera qui modifie l'article
    
    try {
        let update = await Article.findOneAndDelete({_id:req.params.id})
        !update ? res.status(400).send('delete was not considered. Article not found') :  res.status(200).send(`${req.params.id} have been deleted`) 
    } catch(err){
        res.status(400).send(` ${err} est une erreur`)
    }

} 
