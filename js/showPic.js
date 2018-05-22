function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    if(placeholder.nodeName!="IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        if(whichpic.getAttribute("title")){
            var text=whichpic.getAttribute("title");
        }
        else{
            var text="";
        }
        var description=document.getElementById("description");
        if(description.firstChild.nodeType==3){
            description.firstChild.nodeValue=text;
        }
    }
    return true;   
}


function prepareGallery(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imageGallery")) return false;
    var gallery=document.getElementById("imageGallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return !showPic(this);
        }
       /* links[i].onkeypress=links[i].onclick;键盘事件*/
    }
}

/*脚本函数-共享onload事件*/
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload !='function'){
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibing);
    }
}

function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imageGallery")) return false;
    var placeholder=document.createElement("img");
    var description=document.createElement("p");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../pic/4.jpg");
    placeholder.setAttribute("alt","my image gallery");
    description.setAttribute("id","description");
    var descText=document.createTextNode("Choose an image");
    description.appendChild(descText);
    var gallery=document.getElementById("imageGallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
