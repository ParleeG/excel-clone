const fs= require("fs");
let files=["../f1.txt","../f2.txt","../f3.txt"];
for(let i=0;i<files.length;i++){
    let fkapromise= fs.promises.readFile(files[i]);
    fkapromise.then(function(data){
        console.log(data+"");
    })

}