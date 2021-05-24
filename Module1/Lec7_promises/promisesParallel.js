const fs=require("fs");
let f1kapromise= fs.promises.readFile("./f1.txt");
let f2kapromise= fs.promises.readFile("./f2.txt");
let f3kapromise= fs.promises.readFile("./f3.txt");
f1kapromise.then(function(data){
    console.log(data+"");
})
f2kapromise.then(function(data){
    console.log(data+"");
})
f3kapromise.then(function(data){
    console.log(data+"");
})