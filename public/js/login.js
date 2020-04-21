//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
//哈哈哈哈哈哈，我当时这操作相当于直接访问数据库了
// function check(){
//     var htmlobj=$.ajax({url:"/public/db/db.json",async:false});
//     var dt =htmlobj.responseJSON;
//     var user = $("#user").val(), 
//         pwd = $("#pwd").val();
   
//     for(var i=0;i<dt.user.length;i++){
//         var name = dt.user[i].name;
//         var password = dt.user[i].password;
//         if(name === user && password === pwd){
//             console.log(name)
//             console.log(password)
//             $("#top").addClass("top")
//             $("#top").html("登录成功")
//             setTimeout(function(){
//                 console.log(dt.user[i].id)
//                 window.location.href = "/index?id="+dt.user[i].id
//             },2000)
//             return
//         }
//             $("#top").addClass("top")
//             $("#top").html("登录失败")
           
            
          
       
       
//     }
    
//     }
//ajax向后台接口请求数据
$('#login_form').on('submit',function(e){
    e.preventDefault()
    var formData = $(this).serialize()
    console.log(formData)
    if($("#user").val()!="" && $("#pwd").val()!=""){
        save_cookie();
    $.ajax({
        url:'/loginnew',
        type:'post',
        data:formData,
        dataType:'json',
        success:function(data){
          console.log(data)
            if(data.success == false){
            $('h6').addClass('errtop').html('用户名或密码输入错误！！！')
            $('h6').animate({left:'53px',opacity:'1'})
            $("#user").val('')
            $("#pwd").val('')
            $('#user').focus()
                return
            }else{
              $('h6').addClass('successtop').html('登录成功...')
              $('h6').animate({left:'53px',opacity:'1'})
              setTimeout(function(){
                window.location.href = "/index?id="+data.success
            },1000)
               
            }
        }

    })
    }else{
        $('h6').addClass('errtop').html('用户名或密码不能为空！！！')
        $('h6').animate({left:'53px',opacity:'1'})
    }
})


//记住用户名跟密码
    function save_cookie(){
        if( $('.form-check-input').prop('checked')){
            var user = $("#user").val()
            var password = $("#pwd").val()
            $.cookie('remember','true',{expires:7})
            $.cookie('user',user,{expires:7})
            $.cookie('password',password,{expires:7})
        }else{
            $.cookie('remember','false',{expires:-1})
            $.cookie('user','',{expires:-1})
            $.cookie('password','',{expires:-1})
        }
    }


























    
    

    // var user = $("#user"),
    //     password = $("#pwd");
    // var user = user.val(), 
    //     password = password.val();
    // if(user == ""){
    //   showMsg("请输入用户名");
    //   user.focus ();
    //   return false;
    // }
    //  if(password == ""){
    //   showMsg("请输入密码");
    //   password.focus ();
    //   return false;
    // }
  //这里为用ajax获取用户信息并进行验证，如果账户密码不匹配则登录失败，如不需要验证用户信息，这段可不写
//    $.ajax({
//       url : 'public/db/db.json',// 获取自己系统后台用户信息接口
//       data :{"password":password,"name":user},
//       type : "GET",
//       dataType: "json",
//       success : function(data) {
//         if (data){
//             document.write(data)
//           }
//         },
//         error : function(data){
//          showMsg('错误')
//         }
//     });
//   }
   
// //   //错误信息提醒
//   function showMsg(msg){
//     alert(msg);
//   }
   
//   //监听回车键提交
//   $(function(){
//     document.onkeydown=keyDownSearch;
//     function keyDownSearch(e) {
//       // 兼容FF和IE和Opera
//       var theEvent = e || window.event;
//       var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
//       if (code == 13) {
//         $('#submit').click();//具体处理函数
//         return false;
//       }
//       return true;
//     }
//   }