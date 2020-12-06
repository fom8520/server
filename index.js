var rpc = require('json-rpc2');

var fs = require("fs");
var fileName = "data.txt"
fs.open('./' + fileName, 'a', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功");
})

var server = rpc.Server.$create({
    'websocket': true, // is true by default
    'headers': { // allow custom headers is empty by default
        'Access-Control-Allow-Origin': '*'
    }
});

var list = [];

function savaData(data) {
    var i = data.length;
    var listmap = data[i - 1];
    var str = "";
    for (var j = 0; j < listmap.length; j++) {
        str += listmap[j] + ":";
    }


    fs.appendFile('./' + fileName, i + "、" + str.toString() + "\n", function (err) {
        if (err) {
            console.error(err);
        }
        console.log("写入成功")
    })

};

function getData(args, opt, callback){
    var err="NG";
    var result=list;
    callback(err,resull)
}


function add(args, opt, callback) {
    var err, result;
    var i = args.length;
    if (i === 27) {
        result = "OK";
        list.push(args);
        console.log(args);
        console.log(list.length);
        savaData(list);
    } else {
        err = "NG";
    }
    callback(err, result);
}

server.expose('add', add);
server.expose('getData',getData);

// you can expose an entire object as well:

server.expose('namespace', {
    'function1': function () { },
    'function2': function () { },
    'function3': function () { }
});
// expects calls to be namespace.function1, namespace.function2 and namespace.function3

// listen creates an HTTP server on localhost only
server.listen(5080, '0.0.0.0');



