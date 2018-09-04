var express = require("express");
var server = express();
var fs = require("fs");
server.listen("2103",function(){
	console.log("服务器启动成功")
})
server.use(express.static("./src"));
server.use(express.static("./mock"));
server.use(express.static("./node_modules"));
server.get("/index",function(request,response){
	fs.readFile("./mock/index.json",function(err,data){
		response.end(data)
	})
})
server.get("/category",function(requset,response){
	fs.createReadStream("./mock/list.json").pipe(response)
})
server.get("/list/:abc",function(requset,response){
//	params属性,用来储存前端传来的参数
	var codestr=requset.params.abc;
	var result=[];
	fs.readFile("./mock/list.json",function(err,data){
		var ary=JSON.parse(data)
		for (var i=0;i<ary.length;i++) {
			if(ary[i].category == codestr){
				result.push(ary[i])
			}
		}
		response.end(JSON.stringify(result))
	})
	
})
server.get("/detail/:id",function(requset,response){
	var id=requset.params.id;
	fs.readFile("./mock/list.json",function(err,data){
		var ary=JSON.parse(data)
		for (var i=0;i<ary.length;i++) {
			if(ary[i].id == id){
				response.end(JSON.stringify(ary[i]))
			}
		}
		
	})
})
server.post("/reg",function(request,response){
	var str="";
	request.on("data",function(data){
		str +=data
	})
	request.on("end",function(err){
		console.log(str);
		fs.readFile("./mock/reg.json",function(err,data){
			var ary=JSON.parse(data);
			ary.push(JSON.parse(str));
	fs.writeFile("./mock/reg.json",JSON.stringify(ary),function(err){
		console.log("注册完成");
		response.send(true)
	})
		})
		
	})
})
server.post("/test",function(request,response){
	var str="";
		request.on("data",function(data){
		str += data;
	})
	request.on("end",function(err){
		console.log(str);
		fs.readFile("./mock/reg.json",function(err,data){
			var ary = JSON.parse(data);
			var bool= true;
			for(var i=0;i<ary.length;i++){
				if(ary[i].phone == str){
					bool = false;
					response.send(false);
				}
			}
			if(bool){
				response.send(true)
			}
		})
	})
})
server.post("/login",function(request,response){
	var str=""
	request.on("data",function(data){
		str+=data
	})
	request.on("end",function(err){
		console.log(str)
		var obj=JSON.parse(str);
		fs.readFile("./mock/reg.json",function(err,data){
			var ary=JSON.parse(data);
			var bool=true;
			for(var i=0;i<ary.length;i++){
				
				if(ary[i].phone==obj.phone){
					bool=false;
					if(ary[i].pwd==obj.pwd){
						return response.send("ok")
					}else{
						return response.send("密码错误")
					}
				}
				if(bool){
					return response.send("用户不存在")
				}
			}
		})
	})
	
})