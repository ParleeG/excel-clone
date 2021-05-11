const cheerio = require("cheerio");
const request=require("request");
const getAllProjects=require("./allProject.js")
request("https://github.com/topics",function(err,req,data){
    processData(data);
})
function processData(html){
    let mydocument=cheerio.load(html);
    let allTopics=mydocument(".topic-box");
    for(let i=0;i<allTopics.length;i++){
        let link="https://github.com/topics"+mydocument(allTopics[i]).find("a").attr("href");
        let name=mydocument(allTopics[i]).find(".topic-box .f3").text().trim();
        console.log(name);
        getAllProjects(link);
    }
}