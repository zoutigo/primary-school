
const {commentsValidator} = require ('../validators/comments')
const Article = require('../models/Article')
const Event = require('../models/Event')
const Comment = require('../models/Comment')

module.exports.listItemComments = (req, res) => {
    res.send('List comments of one item not implemented')
}

module.exports.createComment = async (req, res) => {
   if(!req.body.content) return res.status(400).send('Please enter the comment content')

     // using Joi validator
    let {value, error} = await commentsValidator(req.body)
    if (error) return res.status(400).send(`${error.details[0].message}`)

    let comment = new Comment({
        content : req.body.content,
        createdAt: Date.now(),
        author: req.body.author

    })
    
    const commentSaved = await comment.save()
   


    const newArticle =  Article.findOne({_id:req.params.itemId}, (err, article)=>{
        if(err) return res.send(err)
      article.comments.push(commentSaved._id)

      article.save()
    
    })

    
  
    if (!newArticle) return res.status(400).send('Failure on new comment saving')

    return res.status(200).send(commentSaved)
    
    

    }



module.exports.readComment = (req, res) => {
    res.send('Read a comment not implemented')
}

module.exports.updateComment = (req, res) => {
    res.send('update comment not implemented ')
}

module.exports.deleteComment = (req, res) => {
    res.send('delete comment not implmented')
}