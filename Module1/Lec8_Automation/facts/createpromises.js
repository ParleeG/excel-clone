const fs = require("fs");
function mypromises(filepath){
    return new Promise(function(scb,fcb){
        fs.readFile(filepath,function(err,data){
            if(err)
                fcb();
            else
                scb(data);    
        })
    });
}

let pendingPromise =mypromises("./f1.txt");

pendingPromise.then( function(data){    
    console.log(data+"");
});
pendingPromise.catch( function(error){
    console.log(error);
});