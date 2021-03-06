
var http=require("http");
var fs=require("fs");//IO文件读入读出；
var url=require("url");
var querystring=require("querystring");
/* 下面是创建数据库*//*
var mysql=require("mysql");*//*需要安装mysqp软件*//*
var conn=mysql.createConnection({
    host:"localhost",
    database:"test",
    username:"root",
    password:""
});
conn.connect();*/

http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    //console.log(JSON.stringify(urlObj));
    //urlObj.pathname;//访问的路径
    //urlObj.query;//查询的字符

    var pathname=urlObj.pathname;
    var query=urlObj.query;
    if(pathname=="/"||pathname=="index.html"){
        if(typeof query.button=="undefined"){
            res.writeHead(200);
            fs.createReadStream("index.html").pipe(res);
        }else{
            var str=JSON.stringify(query);
            var myFile=fs.readFileSync("index.html");

            var myFileStr=myFile.toString().replace(/<inner><\/inner>/,"<inner>"+str+"</inner>");
            res.end(myFileStr);
        }
    }else if(pathname=="/blog/"){
        fs.createReadStream("blog.html").pipe(res);
    }else{
        fs.createReadStream("404.html").pipe(res);
    }
}).listen(8088);