const Topic = require('../models').Topic;

exports.addTopic = (topic)=>{
    return Topic.create(topic);
}

exports.getTopicById = (id)=>{
    return Topic.findByIdAndUpdate(id, {$inc: {pv: 1}})
}

exports.getTopicsByTab = (tab, pageNo=1, pageSize=10)=>{
    let query = {}
    if(tab){
        query.tab = tab;
    }
    return Topic.find(query)
        .skip(pageSize*(pageNo-1))
        .sort('-updated_at')
        .limit(10)
        .select('-content')
        .exec()
}

exports.getTopicsByName = (name)=>{
    return Topic.find({'user.name': name})
        .sort('-updated_at')
        .exec()
}

exports.incCommentById = (id)=>{
    return Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec()
}

exports.getNoReplyTopics = ()=>{
    return Topic.find({comment: 0})
        .sort('-updated_at')
        .limit(5)
        .select('title')
        .exec()
}

exports.getTopicsCount = (tab)=>{
    let query = {}
    if(tab){ query.tab = tab}
    return Topic.count(query).exec()
}

