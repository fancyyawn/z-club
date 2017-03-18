const Topic = require('../service/topic');
const Comment = require('../service/comment');
const Router = require('koa-router');

const topics = new Router();

topics.get('/create', async(ctx)=>{
    await ctx.render('topic/create')
});

topics.post('/create', async(ctx)=>{
    let topic = ctx.request.body;
    topic.user = ctx.session.user;

    let topicSaved = await Topic.addTopic(topic);

    ctx.flash = {success: '发布成功！'};
    await ctx.redirect(`/topics/${topicSaved._id}`)
});

topics.get('/:id', async(ctx)=>{
    let id = ctx.params.id;

    let topic = await Topic.getTopicById(id);

    let comments = await Comment.getCommentsByTopicId(id);

    await ctx.render('topic/detail', {
        topic: topic,
        comments: comments
    })

})

topics.post('/:id/comment', async(ctx)=>{
    let id = ctx.params.id;
    let comment = ctx.request.body;
    comment.user = ctx.session.user;

    await Comment.addComment(comment);
    await Topic.incCommentById(id);

    ctx.flash =  {success: '回复成功!'};
    await ctx.redirect(ctx.query.redirect || 'back')
})

topics.get('/', async(ctx)=>{

    console.log(ctx.query);

    let tab = ctx.query.tab;
    if(tab == "ALL"){
        tab = null;
    }
    let pageNo = ctx.query.pageNo || 1;

    let topics = await Topic.getTopicsByTab(tab, pageNo);

    await ctx.render('topic/list',{
        topics: topics
    })
});

topics.get('/user/:name', async (ctx, next)=>{
    let topics = await Topic.getTopicsByName(ctx.params.name);

    await ctx.render('topic/users-list', {name: ctx.params.name, topics: topics});
});

module.exports = topics;