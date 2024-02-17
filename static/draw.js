var canvas;
var context;
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint = false;
var curColor = "#000000";

/**
    - Preparing the Canvas : Basic functions
**/
function drawCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    canvas.addEventListener('mousedown', function (e) {
        var rectWidth = 400; // Actual width of the canvas
        var rectHeight = 400; // Actual height of the canvas

        var mouseX = (e.clientX - canvas.getBoundingClientRect().left) * (canvas.width / rectWidth);
        var mouseY = (e.clientY - canvas.getBoundingClientRect().top) * (canvas.height / rectHeight);

        paint = true;
        addClick(mouseX, mouseY);
        redraw();
    });

    canvas.addEventListener('mousemove', function (e) {
        if (paint) {
            var rectWidth = 400; // Actual width of the canvas
            var rectHeight = 400; // Actual height of the canvas

            var mouseX = (e.clientX - canvas.getBoundingClientRect().left) * (canvas.width / rectWidth);
            var mouseY = (e.clientY - canvas.getBoundingClientRect().top) * (canvas.height / rectHeight);

            addClick(mouseX, mouseY, true);
            redraw();
        }
    });

    canvas.addEventListener('mouseup', function (e) {
        paint = false;
    });
}

/**
    - Saves the click position
**/
function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

/**
    - Clear the canvas and redraw
**/
function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
    context.strokeStyle = curColor;
    context.lineJoin = "round";
    context.lineWidth = 2;
    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

/**
    - Encodes the image into a base 64 string.
    - Add the string to an hidden tag of the form so Flask can reach it.
**/
function save() {
    var url = document.getElementById('url');
    url.value = canvas.toDataURL();
}


