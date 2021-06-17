let sticky=document.querySelector("#sticky");
sticky.addEventListener("click",function(){
    let stickydiv=document.createElement("div");
    stickydiv.classList.add("sticky");
    stickydiv.innerHTML=`<div class="sticky-header">
    <div class="minimize"></div>
    <div class="close"></div>
    </div>
    <div class="sticky-content" contenteditable="true"></div>`;
    let stickycontent=stickydiv.querySelector(".sticky-content");
    stickydiv.querySelector(".close").addEventListener("click",function(){
        stickydiv.remove();
    });
    stickydiv.querySelector(".minimize").addEventListener("click",function(){
        if(stickycontent.style.display=="none")
            stickycontent.style.display="block";
        else
            stickycontent.style.display="none";
    });
    document.querySelector("body").append(stickydiv);
});