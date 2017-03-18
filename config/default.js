const path = require('path');

module.exports = {
    port: process.env.PORT || 3000,
    keys: ["I am the key"],
    tabs: ['ALL','JAVA','CSharp','Node.js'],
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/club'
    },
    schemeConf: path.join(__dirname, './scheme'),
    locale: 'zh-cn'
};