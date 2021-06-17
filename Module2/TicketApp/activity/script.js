let allFilters = document.querySelectorAll(".filter");
let openmodal = document.querySelector(".open-modal");
let closemodal = document.querySelector(".close-modal");
let isclicked = false;
let istyped = false;
openmodal.addEventListener("click", addticketmodal);
closemodal.addEventListener("click", removeticketmodal);
for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", selectFilter);
}

function selectFilter(e) {
    if(e.target.classList.contains("active-filter")){

    }
    else{
        document.querySelector(".active-filter").remove();
        e.target.classList.add("active-filter");
    }
}
function addticketmodal() {
    if (!isclicked) {
        let ticketModal = document.createElement("div");
        ticketModal.classList.add("ticket-modal");
        ticketModal.innerHTML = `<div class="ticket-text" contenteditable="true" spellcheck="false">Enter your Text!</div>
    <div class="ticket-filters">
        <div class="ticket-filter red selected-filter"></div>
        <div class="ticket-filter blue"></div>
        <div class="ticket-filter green"></div>
        <div class="ticket-filter yellow"></div>
        <div class="ticket-filter black"></div>
    </div>`;
        document.querySelector("body").append(ticketModal);
        isclicked = true;
        istyped=false;
        let textdiv = ticketModal.querySelector(".ticket-text");
        textdiv.addEventListener("keypress", handlekeypress);

        let allticketfilter = ticketModal.querySelectorAll(".ticket-filter");
        for (let i = 0; i < allticketfilter.length; i++) {
            allticketfilter[i].addEventListener("click", function (e) {
                if (e.target.classList.contains("selected-filter")) {
                    return;
                }
                document.querySelector(".selected-filter").classList.remove("selected-filter");
                e.target.classList.add("selected-filter");
            })
        }
    }
}
function removeticketmodal() {
    if (isclicked) {
        document.querySelector(".ticket-modal").remove();
        isclicked = false;
        istyped = false;
    }
}
function handlekeypress(e) {
    if(e.key=="Enter"&& istyped && e.target.textContent){
        let ticketid=uuid();
        ticketinfoobject={
            ticketfilter:document.querySelector(".selected-filter").classList[1],
            tickettext:e.target.textContent,
            ticketid:ticketid
        }
        addticketdb(ticketinfoobject);
        closemodal.click();
        appendticket(ticketinfoobject);
    }
    if (!istyped) {
        e.target.textContent = "";
        istyped = true;
    }
}