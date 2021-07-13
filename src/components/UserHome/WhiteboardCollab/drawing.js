//This uses offical example given on the konvajs page mentioned below to enable user to draw on the canvas,this specific componenet is on how to draw a line on the canvas

/*

KONVA OFFICIAL EXAMPLE https://konvajs.org/docs/sandbox/Free_Drawing.html

*/
import Konva from "konva";
export const addLine = (arena, bglayer, mode = "brush") => {//this exports the following parameters to the whiteboard.js file to use and generate lines
  let isPaint = false;//setting intial paint state as false
  let lastLine;
  arena.on("mousedown touchstart", function (e) {//this fuction is triggered when the mouse is currently in touchdown state
    isPaint = true;//paint is set to true
    let pos = arena.getPointerPosition();//the position of the mouse is recorded
    lastLine = new Konva.Line({//konva library starts drawing the line acording the x and y axis of the points wrt to the canvas
      stroke: mode === "brush" ? "blue" : "white",
      strokeWidth: mode === "brush" ? 5 : 7,
      globalCompositeOperation:
        mode === "brush" ? "source-over" : "source-over",
      points: [pos.x, pos.y],
      draggable: false
    });
    bglayer.add(lastLine);
  });
  arena.on("mouseup touchend", function () {//if the user raises the finger up the touch ends and this function is triggered
    isPaint = false;
  });
  arena.on("mousemove touchmove", function () {//is the user continues to touch the mouse the line continues
    if (!isPaint) {
      return;
    }
    console.log("Mouse moving");//if the mouse is moving then we get the new coordinates and continue the line
    const pos = arena.getPointerPosition();
    let newPoints = lastLine.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
    bglayer.batchDraw();
  });
};

//this functions and methods are exporeted to be used by whiteboard.js
