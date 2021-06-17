let mydb=window.localStorage;
let ticketsContainer = document.querySelector(".tickets-container");
function addticketdb(ticketinfoobject){
    let alltickets=mydb.getItem("alltickets");
    if(alltickets){
        alltickets=JSON.parse(alltickets);
        alltickets.push(ticketinfoobject);
        mydb.setItem("alltickets",JSON.stringify(alltickets));
    }
    else{
        let tickets=[ticketinfoobject];
        mydb.setItem("alltickets",JSON.stringify(tickets));
    }
}
function loadtickets(){
    let alltickets=mydb.getItem("alltickets");
    if(alltickets){
        alltickets=JSON.parse(alltickets);
        for(let i=0;i<alltickets.length;i++){
            let ticketinfoobject=alltickets[i];
            appendticket(ticketinfoobject);
        }
    }
}
loadtickets();
function removeticketdb(ticketid){
    let alltickets=mydb.getItem("alltickets");
    alltickets=JSON.parse(alltickets);
    let updatedtickets=alltickets.filter(function(ticketinfoobject){
        if(ticketinfoobject.ticketid==ticketid){
            return false;
        }
        return true;
    });
    mydb.setItem("alltickets",JSON.stringify(updatedtickets));
}
function appendticket(ticketinfoobject){
    let {ticketfilter,tickettext,ticketid}=ticketinfoobject;
    let ticketdiv=document.createElement("div");
    ticketdiv.classList.add("ticket");
    ticketdiv.innerHTML=`<div class="ticket-header ${ticketfilter}"></div>
    <div class="ticket-content">
        <div class="ticket-info">
            <div class="ticket-id">#${ticketid}</div>
            <div class="ticket-delete fas fa-trash">
            </div>
        </div>
        <div class="ticket-value">
            ${tickettext}
                </div>
    </div>`
    let deletebutton= ticketdiv.querySelector(".ticket-delete");
    deletebutton.addEventListener("click",function(e){
        ticketdiv.remove();
        removeticketdb(ticketid);
    });
    ticketsContainer.append(ticketdiv);
}