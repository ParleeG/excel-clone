let stack=[];
let str="A1+A2";
for(let i=0;i<str.length;i++){
    let ch=str[i];
    if(ch>="A"&&ch<="Z"){
        ch+=str[i+1];
        stack.push(ch);
    }
    else if(ch=="+"){
        stack.push(ch);
    }
}
console.log(stack);