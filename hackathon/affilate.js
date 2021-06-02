const puppeteer = require("puppeteer");
const fs=require("fs");
let content=[];
async function login(){
    let browser =await puppeteer.launch({
        headless:false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab=pages[0];
    await tab.goto("https://affiliate-program.amazon.in/");
    await tab.waitForSelector(".ac-header-item",{visible:true});
    let allnavatabs=await tab.$$(".ac-header-item a");
    let signintab=allnavatabs[3];
    await tab.click(".ac-header-item>a");
    await tab.waitForSelector("#ap_email");
    await tab.type("#ap_email","guptahimanshu0521@gmail.com");
    await tab.type("#ap_password","hellohowsyou");
    await tab.click("#signInSubmit");
    await tab.waitForSelector('li[data-assoc-id="referrals"]>a',{visible:true});
    await tab.waitForTimeout(3000);
    let allnavs=await tab.$$('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li');
    let productli=allnavs[1];
    await productli.click();
    await tab.waitForSelector('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li>ul>li[data-assoc-id="product_links"]');
    let productslink=await tab.$('.ac-nav.ac-page-wrapper>ul[class="ac-nav"]>li>ul>li[data-assoc-id="product_links"]');
    await productslink.click();
    await tab.waitForTimeout(3000);
    let select=await tab.$('select[name="category"]');
    await select.click();
    await tab.waitForTimeout(2000);
    let alloptions=await tab.$$('.a-dropdown-link');
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
    console.log(content);
    
}login();
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