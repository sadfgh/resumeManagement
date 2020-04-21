// 职责：
//     处理路由
//     根据不同请求方法+请求路径设置具体的请求处理函数


var express = require('express')
var formidable = require('formidable');
var router = express.Router()
var fs = require('fs')
var path = require('path')
var commde = require('./public/js/commde.js')


//登录页面加载

//服务端渲染登录页面
    router.get('/',function(req,res){
        res.render('login.html')
    })

//接收异步请求，进行登录判断处理
    router.post('/loginnew',function(req,res){
        var newdata = req.body
        commde.lsave(newdata,function(err,success){
            if(err){
                return res.status(500).send('server error.')
            }
            if(success == false){
                return res.status(200).json({success:false})
                
            }else{
                return res.status(200).json({success:success})
                
                
            }
            // var newurl = '/index?id='+newdata.id
            // res.redirect(newurl)
          
        })
    })


//注册页面处理

//服务端渲染注册页面
router.get('/register',function(req,res){
    res.render('register.html')
})

//发送异步请求处理表单验证
router.post('/registernewajax',function(req,res){
    var newdata = req.body
    commde.ajaxrsave(newdata,function(err,registerData){
        if(err){
            return res.status(500).send('server error.')
        }else{
            return res.status(200).json({registerData})
        }
    })
})

//接收表单提交内容进行注册处理
router.post('/registernew',function(req,res){
    var newdata = req.body
    commde.rsave(newdata,function(err){
        if(err){
            return res.status(500).send('server error.')
        }
        var newurl = '/index?id='+newdata.id
        res.redirect(newurl)
    })
   
})

//测试

router.get('/text',function(req,res){
    res.render('text.html')
})



router.post('/textnew',function(req,res,next){
   var form = new formidable.IncomingForm()
      form.uploadDir = path.join(__dirname,'./public/tmp')
      form.multiples=true
      form.keepExtensions = true
   form.parse(req,function(err,fields,files){
        if(err){
            return next(err)
        }
        if(fields.name == '小明'){
            if(fs.exists(path.join(__dirname,'./public/upload/1'))){

            }else{
                fs.mkdir(path.join(__dirname,'./public/upload/1'),{ recursive: true },function(err){
                    if(err){
                        return false
                    }
                    for(var i=0;i<files.myFile.length;i++){
                        console.log(files.myFile[i].path);
                        console.log('文件名:'+files.myFile[i].name);
                              var t = (new Date()).getTime();
                              //生成随机数
                              var ran = parseInt(Math.random() * 8999 +10000);
                              //拿到扩展名
                              var extname = path.extname(files.myFile[i].name);
                                console.log(extname)
                        //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
                        var oldpath =   path.normalize(files.myFile[i].path);
                        console.log(oldpath)
                  
                        //新的路径
                        let newfilename=t+ran+extname;
                        var newpath =   path.join(__dirname,'./public/upload/1/'+newfilename)
                        console.log('oldpath:'+oldpath+' newpath:'+newpath);
                        
                        fs.rename(oldpath,newpath,function(err){
                            if(err){
                                return false
                            }
                           })
                    }

                   
                })
             
            }
       
           
        }
        res.json({fields,files})
        
   })
})




//后台主页

//服务端渲染主页内容
    router.get('/index',function(req,res){

        fs.readFile('public/db/db.json','utf8',function(err,data){
            if(err){
                return res.status(500).send('server error.')
            } 
            res.render('index.html',{
                personal:JSON.parse(data).user[req.query.id-1].personal,
                background:JSON.parse(data).user[req.query.id-1].background,
                work:JSON.parse(data).user[req.query.id-1].work.name,
                project:JSON.parse(data).user[req.query.id-1].project.name,
                assessment:JSON.parse(data).user[req.query.id-1].assessment.content

            }
            
            )
        })
       
    })


    //个人信息处理

    //渲染个人信息表单
    router.get('/personal',function(req,res){
        fs.readFile('public/db/db.json','utf8',function(err,data){
            if(err){
                return res.status(500).send('server error.')
            }
          
            res.render('personal.html',{
                personal:JSON.parse(data).user[req.query.id-1].personal
            }
            
            )
        })
       
    })
    
   //接收个人信息表单进行处理
    router.post('/personalnew',function(req,res){
       var form = new formidable.IncomingForm()
       

        commde.msave(form,req,function(err,data){
            if(err){
                return res.status(500).send('server error.')
            }
            var newurl = '/index?id='+data
            res.redirect(newurl)
            
        })
         })
     

//工作经验处理

//渲染工作经验表单
    router.get('/work',function(req,res){
        fs.readFile('public/db/db.json','utf8',function(err,data){
            if(err){
                return res.status(500).send('server error.')
            }
           
            res.render('work.html',{
                work:JSON.parse(data).user[req.query.id-1].work.name
            }
            
            )
        })
       
    })
//接收工作经验表单进行处理
    router.post('/worknew',function(req,res){
        console.log(req.body)
        function disposework(data){
            var work ={}
            work.id = data.id
            work.name =[]   
            if(typeof(data.company) != typeof('hello')){
                var number = data.company.length
                for(var i=0;i<number;i++){
                    var company = data.company[i]
                    var position = data.position[i]
                    var content = data.content[i]
                    var harvest = data.harvest[i]
                    work.name.push({company:company,position:position,content:content,harvest:harvest})
                }
            }else{
                work.name.push({
                    company:data.company,position:data.position,content:data.content,harvest:data.harvest
                })
            }
        
       return work
        }
        var work = disposework(req.body)
        console.log(work)
       commde.wsave(work,function(err){
           if(err){
               return res.status(500).send('server error.')
           }
           var newurl = '/index?id='+work.id
           res.redirect(newurl)
       })
        })


//项目经验处理

//渲染项目经验表单
    router.get('/project',function(req,res){
        fs.readFile('public/db/db.json','utf8',function(err,data){
            if(err){
                return res.status(500).send('server error.')
            }
           
            res.render('project.html',{
                project:JSON.parse(data).user[req.query.id-1].project.name
            }
            
            )
        })
    })
 //接收项目经验表单进行处理
    router.post('/projectnew',function(req,res){

        function disposeproject(data){
            var project ={}
            project.id = data.id
            project.name =[]
            if(typeof(data.name) != typeof('hello')){
                var number = data.name.length
             for(var i=0;i<number;i++){
            var name = data.name[i]
            var technology = data.technology[i]
            var describe = data.describe[i]
            var summarize = data.summarize[i]
            project.name.push({name:name,technology:technology,describe:describe,summarize:summarize})
        }}else{
            project.name.push({name:data.name,technology:data.technology,describe:data.describe,summarize:data.summarize})
        }
        return project
        }
        var project = disposeproject(req.body)
        console.log(project)
       commde.psave(project,function(err){
           if(err){
               return res.status(500).send('server error.')
           }
           var newurl = '/index?id='+project.id
           res.redirect(newurl)
       })
        })


//自我评价处理

//渲染自我评价表单
    router.get('/assessment',function(req,res){
        fs.readFile('public/db/db.json','utf8',function(err,data){
            if(err){
                return res.status(500).send('server error.')
            }
           
            res.render('assessment.html',{
                assessment:JSON.parse(data).user[req.query.id-1].assessment.content
            }
            
            )
        })
    })
//接收自我评价表单进行处理
    router.post('/assessmentnew',function(req,res){

       
        var assessment = req.body
        
        console.log(assessment)
       commde.asave(assessment,function(err){
           if(err){
               return res.status(500).send('server error.')
           }
           var newurl = '/index?id='+assessment.id
           res.redirect(newurl)
       })
        })



   
module.exports = router