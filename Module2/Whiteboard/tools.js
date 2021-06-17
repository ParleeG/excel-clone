let undo = document.querySelector("#undo");
let redo=document.querySelector("#redo");
undo.addEventListener("click" , undoLine);
redo.addEventListener("click",redoline);


redolinedb=[];

function undoLine(){
    if(linesDB.length){
        let line=linesDB.pop();
        redolinedb.push(line);
    
        // clear canvas
        ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    
        drawLinesFromDB();
    }
}
function redoline(){
    if(redolinedb.length){
        let line=redolinedb.pop();
        for(let i=0;i<line.length;i++){
            let pointobject=line[i];
            if(pointobject.type=="md"){
                ctx.beginPath();
                ctx.moveTo(pointobject.x,pointobject.y);
            }
            else{
                ctx.lineTo(pointobject.x,pointobject.y);
                ctx.stroke();
            }
        }
        linesDB.push(line);
    }
}

function drawLinesFromDB(){
    for(let i=0 ; i<linesDB.length ; i++){
        let line = linesDB[i];
        for(let i=0 ; i<line.length ; i++){
            let pointObject = line[i];
            if(pointObject.type == "md"){
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }
        }
    }
}