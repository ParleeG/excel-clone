let cellsContainer=document.querySelector(".cells");
let db=[];
 function initialise(){
    let cellscontent=`<div class="top-left-cell"></div>`;
    cellscontent+=`<div class="top-row">`;
    for(let i=0;i<26;i++){
        cellscontent+=`<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`
    }
    cellscontent+=`</div>`
    cellscontent+=`<div class="top-col">`;
    for(let i=0;i<100;i++){
        cellscontent+=`<div class="top-col-cell">${i+1}</div>`
    }
    cellscontent+=`</div>`
    cellscontent+=`<div class="all-cells">`
    for(let i=0;i<100;i++){
        cellscontent+=`<div class="row">`
        for(let j=0;j<26;j++){
            cellscontent+=`<div class="cell" contentEditable="true" rowid="${i}" colid="${j}"></div>`
        }
        cellscontent+=`</div>`;
    }
    cellscontent+=`</div>`
    cellsContainer.innerHTML=cellscontent;
}
function intialisedb(){
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let cellname=String.fromCharCode(65+j)+(i+1);
            let cellobject={
                name:cellname,
                formula:"",
                value:"",
                children:[],
            }
            row.push(cellobject);
        }
        db.push(row);
    }
    console.log(db);
}
intialisedb();
initialise();