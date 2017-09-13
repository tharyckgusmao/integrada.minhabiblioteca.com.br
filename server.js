let path = require('path');
let webpack = require('webpack');
let express = require('express');
let config = require('./webpack.config.dev');


let app = express();
let compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
   noInfo: true,publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler, {
    reload: true
}));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'app/index.html'));
})

app.listen(3000,(err)=>{
    if(err)
    return console.error(err);
    console.log('\033[2J');
    console.log('Server Up!!');
    console.log('Ip : localhost:3000 \r\n\r\n\r\n')
})
