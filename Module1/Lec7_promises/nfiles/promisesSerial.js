const fs= require("fs");
let files=["../f1.txt","../f2.txt","../f3.txt"];
let fkapromise= fs.promises.readFile(files[0]);
for(let i=1;i<files.length;i++){
    fkapromise=fkapromise.then(function(data){
        console.log(data+"");
        let nextfkapromise=fs.promises.readFile(files[i]);
        return nextfkapromise;
    });
}    
fkapromise.then(function(data){
    console.log(data+"");
});