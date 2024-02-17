import React, { useRef, useEffect, useState } from 'react';

export function WhiteBoard() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([])
  let isDragging = false;
  let lastX, lastY;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // console.log(ctx)

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const currentX = e.clientX;
      const currentY = e.clientY;

      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      lastX = currentX;
      lastY = currentY;

      setCoordinates((prevCoordinates) => [
        ...prevCoordinates, [currentX,currentY],
      ]);
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleClear = () => {
    console.log(coordinates)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width, canvas.height)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="border-2 border-black border-solid bg-white"
        height={200}
        width={200}
      ></canvas>
      <div>
        <button className='bg-white mr-10 p-1' onClick={() => handleClear()}>Clear</button>
        <button className='bg-white p-1'>Submit</button>
      </div>
    </div>
  );
}
