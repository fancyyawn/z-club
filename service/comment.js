const Comment = require('../models').Comment;

exports.addComment = (comment)=>{
    return Comment.create(comment);
}

exports.getCommentsByTopicId = (id)=>{
    return Comment.find({topic_id: id})
        .sort('updated_at')
        .exec()
}