const User = require('../service/user');
const Router = require('koa-router');

let users = new Router();

users.get('/login', async (ctx, next) => {
    await ctx.render('login');
});

users.post('/login', async (ctx, next) =>{
    let data = ctx.request.body;

    let user = await User.getUserByName(data.name);
    if(!user || (user.password !== data.password)){
        ctx.flash = {error: '用户名或密码错误！'};
        return ctx.redirect('back');
    }

    ctx.session.user = user;

    ctx.flash = {success: '登录成功！'};
    await ctx.redirect(`/topics/user/${data.name}`);
});



users.get('/logout', async(ctx, next)=>{
    ctx.session = null;
    ctx.redirect('/users/login');
});

users.get('/signup', async(ctx)=>{
    await ctx.render('signup');
});

users.post('/signup', async(ctx) =>{
    let data = ctx.request.body;

    let exist = await User.getUserByName(data.name);
    if(exist){
        ctx.flash = {error: '用户名已经存在!'};
        return ctx.redirect('back');
    }
    await User.addUser(data);

    ctx.session.user = {
        name: data.name,
        email: data.email
    };

    ctx.flash = {success: '注册成功！'};

    await ctx.redirect(`/topics/user/${data.name}`);
});

module.exports = users;