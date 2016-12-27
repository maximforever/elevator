var run = true;
var NUM_FLOORS = 10;
var currentFloor = 1;
var destination = 1;
var moveList = [];
var moving = false;
var pickingUp = false;


$(document).ready(main);


function main(){

    console.log("hi!");

    initialize();
        

    setInterval(function(){
        if (!pickingUp){
            mainLoop();
        }
    }, 1000);


    $(".floor-button").click(function(){

        var id = $(this).attr("id");

        if(moveList.indexOf(id) == -1){
            moveList.push(id);
            $(this).addClass("selected");
            $(this).prop("disabled",true);
            $("#floor-" + currentFloor).addClass("moving");

            $("#array").text(moveList);
        }
    });

}

function mainLoop(){

    if(moveList.length > 0){

            console.log("Floors: " + moveList);
            moving = true;
            $("#floor-"+currentFloor).addClass("moving");
            destination = moveList[0];


            if(destination == currentFloor) {
                moveList.splice(0,1);       // remove the floor we just arrived to from the list
                $("#array").text(moveList);
                $("#" + currentFloor).removeClass("selected"); 
                $("#" + currentFloor).prop("disabled",false);
                stop();
            } else if(destination > currentFloor){
                up();
            } else if(destination < currentFloor){
                down();
            }  else {
                console.log("something's wrong");
            }

            $("#curr-floor").text(currentFloor);
        
    } else {
        console.log("No next floor selected");
        moving = false;
        $(".floor").removeClass("moving");
         $(".floor-button").removeClass("selected"); 
         $(".floor-button").prop("disabled",false);
        
    }
}



function initialize(){

// This creates the floors

    for(var i = 1; i <= NUM_FLOORS; i++){
        $(".elevator").prepend("<div class = 'floor' id = 'floor-" + i + "'>" + i + "<div class = 'people-" + i + "'><div class = 'people-container'></div></div></div");
        $(".people").prepend("<div class = 'waiting-area' id = 'people-" + i + "'></div");
        $(".controls").append("<br><button class = 'floor-button' id = '" + (NUM_FLOORS + 1 - i) + "'>" + (NUM_FLOORS + 1 - i) + "</button>");

        if(i == 1){
            $("#floor-1").addClass("active");
        }
    }

    $(".controls").append("<br><p> Next floors: <span  id = 'array'>" + moveList + "</span></p>");

    var height = $(window).height()/NUM_FLOORS - 10;
    $(".floor").height(height + "px").width(height + "px");
    $(".waiting-area").height(height + "px").width(height + "px");

    $(".people-container").append("<span class = 'person'></span");
    $(".people-container").append("<span class = 'person'></span");
    $(".people-container").append("<span class = 'person'></span");
    $(".people-container").append("<span class = 'person'></span");
    
}

function up(){
    $("#floor-" + currentFloor).removeClass("active");
    currentFloor += 1;
    $("#floor-" + currentFloor).addClass("active moving");
    $("#floor-" + (currentFloor-1)).removeClass("moving");
}


function down(){
    $("#floor-" + currentFloor).removeClass("active");
    currentFloor -= 1;
    $("#floor-" + currentFloor).addClass("active moving");
    $("#floor-" + (currentFloor+1)).removeClass("moving");
}


function stop(){
    pickingUp = true;
    $("#floor-"+currentFloor).removeClass("moving");
    console.log("let's pick up some people on " + currentFloor);  

    setTimeout(
        function(){
            pickingUp = false;
            $("#floor-"+currentFloor).addClass("moving");
        }, 2000);
}






