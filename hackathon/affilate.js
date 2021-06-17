const puppeteer = require("puppeteer");
async function open(){
    let browser =await puppeteer.launch({
        headless:false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let hi=pages[0];
    hi.goto("C:\\Users\\HIMANSHU GUPTA\\Desktop\\Pepcoding\\DEV_PP\\hackathon\\check.html");
}open();
function myfunction(){
    const puppeteer = require("puppeteer");
    const fs=require("fs");
    let content=[];//array for all the products links
    async function login(){
        let browser =await puppeteer.launch({
            headless:false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let pages = await browser.pages();
        let tab=pages[1];


        //navigation to amazon affilation and login to account----------------------------
        await tab.goto("https://affiliate-program.amazon.in/");
        await tab.waitForSelector(".ac-header-item",{visible:true});
        let allnavatabs=await tab.$$(".ac-header-item a");
        let signintab=allnavatabs[3];
        await tab.click(".ac-header-item>a");
        await tab.waitForSelector("#ap_email");
        await tab.type("#ap_email","guptahimanshu0521@gmail.com");
        await tab.type("#ap_password","hellohowsyou");
        await tab.click("#signInSubmit");
        //-----------------------------------------------------------------



        //naviagte to product lists------------------------------------- 
        await tab.waitForSelector('li[data-assoc-id="referrals"]>a',{visible:true});
        await tab.waitForTimeout(3000);
        let allnavs=await tab.$$('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li');
        let productli=allnavs[1];
        await productli.click();
        await tab.waitForSelector('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li>ul>li[data-assoc-id="product_links"]');
        let productslink=await tab.$('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li>ul>li[data-assoc-id="product_links"]');
        await productslink.click();
        //----------------------------------------------



        //Select the sub category to search for the products------------
        await tab.waitForTimeout(3000);
        let select=await tab.$('select[name="category"]');
        await select.click();
        await tab.waitForTimeout(2000);
        let alloptions=await tab.$$('.a-dropdown-link');
        //----------------------------------------------------



        //Getting all the products links and store in the array named contents---------------
        for(let j=1;j<5;j++){
            let optionToclick=await tab.evaluate(function(elem){return elem.click();},alloptions[j]);
            await tab.click('.a-button-input');
            await tab.waitForTimeout(3000);
            let allgetlinks=await tab.$$('a[role="button"]');
            await tab.waitForTimeout(2000);
            for(let i=0;i<5;i++){
                let fetchlink= await tab.evaluate(function(elem){return elem.getAttribute("href");},allgetlinks[i]);
                fetchlink="https://affiliate-program.amazon.in"+fetchlink;
                await sendLinks(browser,fetchlink);
            }
        }
        //----------------------------------------------------
        console.log(content);
    }login();


    // function to open the products and getting links in new tab-----------------
    async function sendLinks(browser,fetchlink){
        let newtab= await browser.newPage();
        await newtab.goto(fetchlink);
        await newtab.waitForSelector('.ac-ad-code-area');
        let code= await newtab.evaluate(function(elem){
            let text=document.querySelector('.ac-ad-code-area').value;
            return text;
        },'.ac-ad-code-area');
        content.push(code);
        newtab.close();
    }
}