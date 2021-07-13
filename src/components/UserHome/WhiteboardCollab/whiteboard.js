import React, {useState} from "react";
import { Stage, Layer } from "react-konva";
import { addLine } from "./drawing";
import "./whiteboard.css";
import {Button} from 'react-bootstrap';
import DarkModeToggle from "react-dark-mode-toggle";//importing dark mode toogle library


function Whiteboard() {
  const [isDarkMode, setIsDarkMode] = useState(() => true);//useState to see if the dark theme is enabled
  const mainarena = React.createRef();
  const bgwafer = React.createRef();

  const drawLine = () => {//this function uses the addline function imported from the drawing.js to start drawing the line
    addLine(mainarena.current.getStage(), bgwafer.current);
  };

  const eraseLine = () => {//this function is used to erase the line
    addLine(mainarena.current.getStage(), bgwafer.current, "erase");
  };

  const clearCanvas = () => {//this clears the complete screen and gives a new screen
    bgwafer.current.destroyChildren();
  };

  //creating a canvas by using stage form konva and simple react-bootstrap buttons to use the above functions
  return (
    <div className={`${isDarkMode ? "mainbg-dark" : "mainbg-light"}`}>
      <h1 className="headingmain">Piperboard</h1>
      <Button className="setting-buttons" variant="outline-success" onClick={drawLine}>Start Drawing!</Button>
      <Button className="setting-buttons" variant="outline-warning" onClick={eraseLine}>Erase</Button>
      <Button className="setting-buttons" variant="outline-danger" onClick={clearCanvas}>Clear Canvas</Button>
      <DarkModeToggle
        onChange={setIsDarkMode}
        checked={isDarkMode}
        size={80}
      />

      <Stage
        className={`${isDarkMode ? "border-light" : "border-dark"}`}
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 100}
        ref={mainarena}
      >
        <Layer ref={bgwafer}></Layer>
      </Stage>
    </div>
  );
}
export default Whiteboard;
