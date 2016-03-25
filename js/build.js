var config = {
    row:6,
    column:7
}

function buildGrid(){
    var row = config.row,
        column = config.column,
        htmlStr = "";
    htmlStr = '<div class="group"><div class="box-bord"></div>';   
    for(var i = 0;i<row;i++){
        htmlStr += '<div class="box-bord">'+(i+1)+'</div>';
    }
    htmlStr +='</div>';
    for(var i = 0;i<column;i++){
        htmlStr += '<div class="group"><div class="box-bord">'+(i+1)+'</div>';
        for(var j = 0;j<row;j++){
            htmlStr += '<div class="box"></div>';
        }
        htmlStr +='</div>';
    }
    document.getElementById("Grid").innerHTML = htmlStr;
}

function setForwordColor(point){
    var boxs = document.getElementsByClassName("box");
    boxs[point].style.backgroundColor = "#FF4949";
    if(window.forward == 0){
        boxs[point].innerHTML = '<div class="up"></div>';
    }
    if(window.forward == 1){
        boxs[point].innerHTML = '<div class="right"></div>';
    }
    if(window.forward == 2){
        boxs[point].innerHTML = '<div class="down"></div>';
    }
    if(window.forward == 3){
        boxs[point].innerHTML = '<div class="left"></div>';
    }
}

function changeForward(forward){
    var point = window.startAt;
    var boxs = document.getElementsByClassName("box");
    if(forward == "right"){
        window.forward = window.forward+1;
        if(window.forward>3){
            window.forward = window.forward-4;
        }
    }
    
    if(forward == "left"){
        window.forward = window.forward-1;
        if(window.forward<0){
            window.forward = window.forward+4;
        }
    }
    
    if(forward == "back"){
        window.forward = window.forward +2;
        if(window.forward>3){
            window.forward = window.forward-4;
        }
    }

    if((point<boxs.length) && (point>0) ){
        setForwordColor(point);
    }
}

function move(){
    var point = window.startAt,
        forward = window.forward;
    var boxs = document.getElementsByClassName("box"),
        next = 0,
        row = config.row,
        column = config.column,
        leftBorder = [],
        rightBorder = [];
    for(var i =0;i<column;i++){
        leftBorder.push(row*i);
        rightBorder.push(row+row*i-1);
    }    
    console.log(leftBorder)
    console.log(rightBorder)
    if((point<boxs.length) && (point>0) ){
        switch(forward){
            case 0:{
                next = point - row;
                if(next<0){
                    next = point
                }
                console.log(point);
                break;
            }
            case 2:{
                next = point + row;
                if(next>boxs.length-1){
                    next = point
                }
                break;
            }
            case 3:{
                next = point - 1;
                for (i in leftBorder){
                    if(leftBorder[i]=== point){
                         next = point;
                    }
                }
                break;
            }
            case 1:{
                next = point + 1;
                for (i in rightBorder){
                    if(rightBorder[i] === point){
                         next = point;
                    }
                }
                break;
            }
        }
    }
    window.startAt = next;
    //console.log("from " + point +" forward "+ forward +" to " + next)
    boxs[point].style.backgroundColor = "#FFF";
    boxs[point].innerHTML = '';
    setForwordColor(next);
}

function init(){
    var startAt = Math.ceil(Math.random() * config.row * config.column) -1,
        forwardAT = Math.random(),
        forward = '';
    window.startAt = startAt;
    if(forwardAT<0.25){
        forward = 0;
    }else if(forwardAT<0.5){
        forward = 1;
    }else if(forwardAT<0.75){
        forward = 2;
    }else{
        forward = 3;
    }
    window.forward = forward;
    setForwordColor(window.startAt);
    
    document.getElementById("tl").addEventListener("click",function(){
        changeForward("left");
    })
    document.getElementById("tr").addEventListener("click",function(){
        changeForward("right");
    })
    document.getElementById("tb").addEventListener("click",function(){
        changeForward("back");
    })
    document.getElementById("go").addEventListener("click",function(){
        move();
    })
    document.getElementById("execute").addEventListener("click",function(){
        var order = document.getElementById("order").value;
        switch(order){
            case "turn left":{
                changeForward("left");
                break;
            }
            case "turn right":{
                changeForward("right");
                break;
            }
            case "turn back":{
                changeForward("back");
                break;
            }
            case "go":{
                move();
                break;
            }
        }
    })
}

buildGrid();
init();