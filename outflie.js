var fs=require("fs");
fs.open('./data.txt','a',function(err,fd){
    if(err){
        return console.error(err);
    }
    console.log("文件打开成功");
})