// 职责：
//     创建模块
//     做服务相关配置
//     模板引擎
//     body-parser解析表单post请求提供静态资源服务
//     挂载路由
//     监听端口启动服务


var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))
//配置art-template 模板引擎
//第一个参数，表示当渲染以 .art结尾的文件的时候，使用 art-template 模板引擎
//express-art-template是专门用来在express中把art-template整合到express中
//虽然外面这里不需要记载 art-template但是也必须安装
//原因就在于express-art-template依赖了art-template
app.engine('html',require('express-art-template'))
//express 为response相应对象提供了一个方法：render
//render方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
//res.render('html模板名',{模板数据})
//第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
//也就是说express有一个约定，开发人员把所有的视图文件都放到views目录中

//如果想要修改默认的views目录，则可以
//app.set('views',render函数的默认路径)
//配置post请求
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//挂载路由
app.use(router)
app.listen(3000,function(){
    console.log('running.........')
})