let topRow=document.querySelector(".top-row");
let topCol=document.querySelector(".top-col");
let topLeftCell=document.querySelector(".top-left-cell");
let allcells= document.querySelectorAll(".cell");
let address=document.getElementById("address");
let formula=document.getElementById("formula");
let lastSelectedcell;
cellsContainer.addEventListener("scroll",function(e){
    let topoffset=e.target.scrollTop;
    let leftoffset=e.target.scrollLeft;
    // console.log(topoffset);
    // console.log(leftoffset);
    topRow.style.top=topoffset+"px";
    topCol.style.left=leftoffset+"px";
    topLeftCell.style.top=topoffset+"px";
    topLeftCell.style.left=leftoffset+"px";
});
formula.addEventListener("blur",function(e){
    let formula=e.target.value;
    if(formula){
        let cellobject= getcellobjectfromElement(lastSelectedcell);
        let calculatedValue=solveformula(formula,cellobject);
        lastSelectedcell.textContent=calculatedValue;
        cellobject.formula=formula;
        cellobject.value=calculatedValue;
    }

})
for(let i=0;i<allcells.length;i++){
    allcells[i].addEventListener("click",function(e){
        let cellobject=getcellobjectfromElement(e.target);
        address.value=cellobject.name;
        formula.value=cellobject.formula;
    })
    allcells[i].addEventListener("blur",function(e){
        lastSelectedcell=e.target;
        let rowid=e.target.getAttribute("rowid");
        let colid=e.target.getAttribute("colid");
        let celldata=e.target.textContent;
        let cellobject=db[rowid][colid];
        cellobject.value=celldata;
        updatechildren(cellobject.children);
    })
}
 function getcellobjectfromElement(element){
    let rowid=element.getAttribute("rowid");
    let colid=element.getAttribute("colid");
    return db[rowid][colid];
 }
 function solveformula(formula,selfcellobject){
    //A1+A2
    let formComp=formula.split(" ");
    for(let i=0;i<formComp.length;i++){
        let form=formComp[i];
        if(form[0]>="A"&&form[0]<="Z"){
            let parentobject=getcellobjectfromName(form);
            if(selfcellobject){
                parentobject.children.push(selfcellobject.name);
            }
            formula=formula.replace(form,parentobject.value)
        }
    }
    let calculatedValues=eval(formula);
    // let stack=[];
    // for(let i=0;i<formula.length;i++){
    //     let ch=formula[i];
    //     if(ch=="("){
    //         stack.push(ch);
    //     }
    //     else if(ch==")"){
    //         while(stack[stack.length-1]!='('){
    //             let val2object=getcellobjectfromName(stack.pop());
    //         }
    //     }
    //     else if(ch>="A"&&ch<="Z"){
    //         ch+=formula[i+1];
    //         stack.push(ch);
    //     }
    //     else if(ch>="a"&&ch<="z"){
    //         alert("Please write the Column names in Capital letters");
    //     }
    //     else if(ch=="+"||ch=="-"){
    //         stack.push(ch);
    //     }
    // }
    return calculatedValues;
 }
 function getcellobjectfromName(name){
    let colid=name.charCodeAt(0)-65;
    let rowid=Number(name.substring(1))-1;
    return db[rowid][colid];
 }
 function updatechildren(childern){
     for(let i=0;i<childern.length;i++){
         let child=childern[i];
         let childcellobject=getcellobjectfromName(child);
         let updatedchildvalue=solveformula(childcellobject.formula);
         childcellobject.value=updatedchildvalue;
         let colid=child.charCodeAt(0)-65;
         let rowid=Number(child.substring(1))-1;
         document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).textContent=updatedchildvalue;
         updatechildren(childcellobject.children);
     }
 }