function styleElementSibing(tag,theClass){
    if(!document.getElementsByTagName("h1"))
    return false;
    var elem;
    var headers=document.getElementsByTagName(tag);
    for(var i=0;i<headers.length;i++){
        elem=getNextElement(headers[i].nextSibling);
        addClass(elem,theClass);
        //elem.className="intro";//className,N大写
        //elem.setAttribute("class","intro");
        // elem.style.color="red";
        // elem.style.fontWeight="bold";
        // elem.style.fontSize="1.2em";
    }  
} 
function getNextElement(node){
    if(node.nodeType==1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}
//addLoadEvent(getNextElement);
addLoadEvent(function(){
    styleElementSibing("h1","intro");
});
//addLoadEvent(getNextElement);
function addClass(element,value){
    if(!element.className){
        element.className=value;
    }
    else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+= value;
    }
}