  
  //异步验证用户名是否重复
   $("#name").blur(function(){
    var name = $("#name").val()
    console.log(name)
    $.ajax({
              url:'/registernewajax',
              type:'post',
             data:name,
             dataType:'json',
             success:function(data){
                 names = data.registerData.name
                 var strnew = names.length+1
                 $("#id").val(strnew)
                 console.log(strnew)
                 console.log(names)
                for(var i=0;i<names.length;i++){
                    if(names[i] == name){
                        $("#name").css({"border-color":"red"})
                        $("#name").animate({"right":"15px"},500,function(){
                       $("#name").animate({"left":"15px"},500,function(){
                          $("#name").animate({"left":"0px"},500)
                            })
                          })
                          $("#name").val('')
                          $("#name").focus()
           
                        return
                    }else{
                        $("#name").css({"border-color":"#ced4da"})
                    }
                }
                
             }
        })
    })


//异步验证邮箱是否重复
$("#email").blur(function(){
    var email = $("#email").val()
    console.log(email)
    $.ajax({
              url:'/registernewajax',
              type:'post',
             data:email,
             dataType:'json',
             success:function(data){
                emails = data.registerData.email


                 console.log(emails)
                for(var i=0;i<emails.length;i++){
                    if(emails[i] == email){
                        $("#email").css({"border-color":"red"})
                        $("#email").animate({"right":"15px"},500,function(){
                       $("#email").animate({"left":"15px"},500,function(){
                          $("#email").animate({"left":"0px"},500)
                            })
                          })
                          $("#email").val('')
                          $("#email").focus()
           
                        return
                    }else{
                        $("#email").css({"border-color":"#ced4da"})
                    }
                }
                
             }
        })
    })


//异步验证密码是否重复   
$("#pwd").blur(function(){
    var pwd = $("#pwd").val()
    console.log(pwd)
    $.ajax({
              url:'/registernewajax',
              type:'post',
             data:pwd,
             dataType:'json',
             success:function(data){
                passwords = data.registerData.password


                 console.log(passwords)
                for(var i=0;i<passwords.length;i++){
                    if(passwords[i] == pwd){
                        $("#pwd").css({"border-color":"red"})
                        $("#pwd").animate({"right":"15px"},500,function(){
                       $("#pwd").animate({"left":"15px"},500,function(){
                          $("#pwd").animate({"left":"0px"},500)
                            })
                          })
                          $("#pwd").val('')
                          $("#pwd").focus()
           
                        return
                    }else{
                        $("#pwd").css({"border-color":"#ced4da"})
                    }
                }
                
             }
        })
    })


//验证两次密码是否一致
$("#pwds").blur(function(){
    var pwd = $("#pwd").val()
    var pwds = $("#pwds").val()
    if(pwd != pwds){
        $("#pwds").css({"border-color":"red"})
        $("#pwds").animate({"right":"15px"},500,function(){
                $("#pwds").animate({"left":"15px"},500,function(){
                $("#pwds").animate({"left":"0px"},500)
                })
            })
            $("#pwds").val('')
        return
    }else{
            $("#pwds").css({"border-color":"#ced4da"})
        }
    })

    
//判断提交数据是否为空
function ifnull(){
    if($("#name").val() !=""&&
        $("#email").val() !=""&&
        $("#pwd").val() !=""&&
    $("#pwds").val() !=""&&
    $("#age").val() !=""&&
    $("#education").val() !=""&&
    $("#graduate").val() !=""&&
    $("#phone").val() !=""&&
    $("#position").val() !=""&&
    $("#major").val() !=""&&
    $("#course").val() != ""){
        return true
            }else{
                alert('注册内容不能为空，请完善注册信息')
                return false
            }
}
