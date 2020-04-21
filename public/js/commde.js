var fs = require('fs')
var path = require('path')

//异步登录验证处理
exports.lsave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var user=JSON.parse(data).user

        console.log(newdata)
             
        for(var i = 0;i<user.length;i++){
            if(user[i].name == newdata.user && user[i].password == newdata.password){
                return callback(null,user[i].id)
            }  
        }
       
            return callback(null,false)
      
          
        })
}


//异步注册验证处理
exports.ajaxrsave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var user=JSON.parse(data).user
        var registerData = {}
        var name = []
        var email =[]
        var password =[]
        for(var i = 0;i<user.length;i++){
            name.push(user[i].name)
            email.push(user[i].personal.email)
            password.push(user[i].password)
        }
        registerData.name = name
        registerData.email = email
        registerData.password = password
        console.log(registerData)
        return callback(null,registerData)
    })
}


//注册表单提交处理
exports.rsave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
        console.log(newdata)
       console.log(newdata.id)
       var user=JSON.parse(data).user
         user.push(
            {
                id:newdata.id,
                name:newdata.name,
                password:newdata.password,
                personal:
                {
                    name:newdata.name,
                    email:newdata.email,
                    sex:newdata.sex,
                    age:newdata.age,
                    education:newdata.education,
                    graduate:newdata.graduate,
                    phone:newdata.phone,
                    position:newdata.position
                },
                background:
                {
                    graduate:newdata.graduate,
                    major:newdata.major,
                    course:newdata.course
                    },
                    work:{
                        id:newdata.id,
                        name:[
                    {
                        company:"",
                        position:"",
                        content:"",
                        harvest:""
                        }   
                    ]},
                    project:{
                        id:newdata.id,
                        name:[
                    {
                        name:"",
                        technology:"",
                        describe:"",
                        summarize:""
                        }
                ]},
                assessment:{
                   id: newdata.id,
                   content:""
                }
            }
         )
        var fileData = JSON.stringify({
            user:user
        })
        fs.writeFile('public/db/db.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        })
}


//个人信息表单提交处理
exports.msave = function(form,req,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
       
        var user=JSON.parse(data).user
        form.uploadDir = path.join(__dirname,'../../public/tmp')
        form.multiples=true
        form.keepExtensions = true
        form.parse(req,function(err,fields,files){
            if(err){
                return false
            }
            var personal = fields
            console.log(personal)


            function create(callfile){
                
                fs.mkdir(path.join(__dirname,'../../public/upload/'+personal.id),{ recursive: true },function(err){
                    if(err){
                        return false
                    }
                    var src = []
                    
                    for(var i=0;i<files.files.length;i++){
                        console.log(files.files[i].path);
                        console.log('文件名:'+files.files[i].name);
                              var t = (new Date()).getTime();
                              //生成随机数
                              var ran = parseInt(Math.random() * 8999 +10000);
                              //拿到扩展名
                              var extname = path.extname(files.files[i].name);
                                console.log(extname)
                        //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
                        var oldpath =   path.normalize(files.files[i].path);
                        console.log(oldpath)
                  
                        //新的路径
                        var newfilename=t+ran+extname;
                        src.push('public/upload/'+personal.id+'/'+newfilename)
                        var newpath =   path.join(__dirname,'../../public/upload/'+personal.id+'/'+newfilename)
                        console.log('oldpath:'+oldpath+' newpath:'+newpath);
                        
                        fs.rename(oldpath,newpath,function(err){
                            if(err){
                                return false
                            }
                           
                           })
                         
                    }
                   console.log(src)
                   src.length = 9
                   personal.src = src
                   callfile(personal)
                })
              
                
               
            }
           

        for(var i = 0;i<user.length;i++){
            console.log(user[i].id)
           
            if(user[i].id == personal.id){
                console.log('--------------------------')
                fs.exists(path.join(__dirname,'../../public/upload/'+personal.id),function(exists){
                    if(exists){
                        fs.readdir(path.join(__dirname,'../../public/upload/'+personal.id),function(err,data){
                            if(err){
                                console.log('读取目录失败')
                                return false
                            }
                            if(data == ''){
                                fs.rmdir(path.join(__dirname,'../../public/upload/'+personal.id),function(err){
                                    if(err){
                                        console.log('删除目录失败')
                                        return false
                                    }
                                    console.log('删除目录成功')
                                    create(function(personal){
                                        fs.readFile('public/db/db.json','utf8',function(err,data){
                                            if(err){
                                                return false
                                            }
                                            var user=JSON.parse(data).user
                                            for(var i =0;i<user.length;i++){
                                                if(user[i].id == personal.id){
                                                    user[i].personal = personal
                                                    console.log(user[i].personal)
                                                }
                                            }
                                            var fileData = JSON.stringify({
                                                user:user
                                            })
                                            fs.writeFile('public/db/db.json',fileData,function(err){
                                                    if(err){
                                                        return false
                                                    }
                                                    console.log('修改成功')
                                                    console.log(personal.id)
                                                    return callback(null,personal.id)
                                                })
                                        })
                                    })
                                })
                            }else{
                               
                                    for(var i = 0;i<data.length;i++){
                                        var filepath = path.join(__dirname,'../../public/upload/'+personal.id+'/'+data[i])
                                        console.log(filepath)
                                        fs.unlink(filepath,function(err){
                                            if(err){
                                                console.log('删除文件失败')
                                                return false
                                            }
                                            console.log('删除文件成功')
                                            fs.rmdir(path.join(__dirname,'../../public/upload/'+personal.id),function(err){
                                                if(err){
                                                    console.log('删除目录失败')
                                                    return false
                                                }
                                                console.log('删除目录成功')
                                                create(function(personal){
                                                    fs.readFile('public/db/db.json','utf8',function(err,data){
                                                        if(err){
                                                            return callback(err)
                                                        }
                                                        var user=JSON.parse(data).user
                                                        for(var i =0;i<user.length;i++){
                                                            if(user[i].id == personal.id){
                                                                user[i].personal = personal
                                                                console.log(user[i].personal)
                                                            }
                                                        }
                                                        var fileData = JSON.stringify({
                                                            user:user
                                                        })
                                                        fs.writeFile('public/db/db.json',fileData,function(err){
                                                                if(err){
                                                                    return callback(err)
                                                                }
                                                                console.log('修改成功')
                                                                console.log(personal.id)
                                                                return callback(null,personal.id)
                                                            })
                                                    })
                                                })
                                          
                                        })
                                         
                                        })
                                    }
                             
                                   
                                    
                               
                         
                            
                        }
                           
                    })

                    }else{
                        create(function(personal){
                            fs.readFile('public/db/db.json','utf8',function(err,data){
                                if(err){
                                    return false
                                }
                                var user=JSON.parse(data).user
                                for(var i =0;i<user.length;i++){
                                    if(user[i].id == personal.id){
                                        user[i].personal = personal
                                        console.log(user[i].personal)
                                    }
                                }
                                var fileData = JSON.stringify({
                                    user:user
                                })
                                fs.writeFile('public/db/db.json',fileData,function(err){
                                        if(err){
                                            return false
                                        }
                                        console.log('修改成功')
                                        console.log(personal.id)
                                        return callback(null,personal.id)
                                    })
                            })
                        })
                     
                }
                })
                
              
            }
           
            
        }
      
         
        })
    })
        // for(var i = 0;i<user.length;i++){
        //     console.log(user[i].id)
        //     if(user[i].id == newdata.id){
        //         console.log('true')
        //         user[i].personal = newdata
        //         console.log(user[i].personal)
        //     }else{
        //         console.log('false')
        //     }
        // }
      
        // var fileData = JSON.stringify({
        //     user:user
        // })
       
        // fs.writeFile('public/db/db.json',fileData,function(err){
        //     if(err){
        //         return callback(err)
        //     }
        //     callback(null)
        // })
   
}


//工作经验表单提交处理
exports.wsave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
        console.log(newdata.id)
        var user=JSON.parse(data).user
        for(var i = 0;i<user.length;i++){
            console.log(user[i].id)
            if(user[i].id == newdata.id){
                console.log('true')
                user[i].work = newdata
                console.log(user[i].work)
            }else{
                console.log('false')
            }
        }
        console.log(user)

        var fileData = JSON.stringify({
            user:user
        })
        fs.writeFile('public/db/db.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        })
}



//项目经验表单提交处理
exports.psave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
       
        console.log(newdata.id)
        var user=JSON.parse(data).user
        for(var i = 0;i<user.length;i++){
            console.log(user[i].id)
            if(user[i].id == newdata.id){
                console.log('true')
                user[i].project = newdata
                console.log(user[i].project)
            }else{
                console.log('false')
            }
        }
        console.log(user)

        var fileData = JSON.stringify({
            user:user
        })
        fs.writeFile('public/db/db.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        })
}


//自我介绍表单提交处理
exports.asave = function(newdata,callback){
    fs.readFile('public/db/db.json','utf8',function(err,data){
        if(err){
            return callback(err)
        }
       
        console.log(newdata.id)
        var user=JSON.parse(data).user
        for(var i = 0;i<user.length;i++){
            console.log(user[i].id)
            if(user[i].id == newdata.id){
                console.log('true')
                user[i].assessment = newdata
                console.log(user[i].assessment)
            }else{
                console.log('false')
            }
        }
        console.log(user)

        var fileData = JSON.stringify({
            user:user
        })
        fs.writeFile('public/db/db.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        })
}