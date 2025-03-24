
import { useRef, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';

const WaveformGraph = ({ type }) => {
  const canvasRef = useRef(null);
  const { isRunning, time, amplitude, simulationType } = useSimulation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Set up the grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      
      // Grid lines
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x <= width; x += width / 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        
        // Dashed lines
        if (x < width) {
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(x + width / 20, 0);
          ctx.lineTo(x + width / 20, height);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      
      // Horizontal grid lines
      for (let y = 0; y <= height; y += height / 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        
        // Dashed lines
        if (y < height) {
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(0, y + height / 16);
          ctx.lineTo(width, y + height / 16);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      
      // Center line (x-axis)
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    // Draw input sine wave (yellow) with continuous flow
    const drawInputWave = () => {
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const cycleWidth = width / 3; // Width of one complete cycle
      const scrollOffset = (time * 5) % cycleWidth; // Scrolling effect based on time
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI; // Convert position to angle
        // Reduce amplitude to only use 2 rows (1/4 of height)
        const y = height / 2 + Math.sin(t) * (height / 8) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    };

    // Draw output wave for Class-B amplifier with continuous flow
    const drawClassBOutputWave = () => {
      const cycleWidth = width / 3; // Width of one complete cycle
      const scrollOffset = (time * 5) % cycleWidth; // Scrolling effect based on time
      
      // For positive half-cycle (green)
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        let y = Math.sin(t) * (height / 8) * amplitude; // Reduced to 1/8 height
        // Only draw positive half
        y = y > 0 ? height / 2 - y : height / 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // For negative half-cycle (red)
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        let y = Math.sin(t) * (height / 8) * amplitude; // Reduced to 1/8 height
        // Only draw negative half
        y = y < 0 ? height / 2 - y : height / 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    };

    // Class-A amplifier output with continuous flow
    const drawClassAOutputWave = () => {
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const cycleWidth = width / 3;
      const scrollOffset = (time * 5) % cycleWidth;
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        // Reduced to 1/8 height
        const y = height / 2 + Math.sin(t) * (height / 8) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    };

    // Class-AB amplifier output with continuous flow
    const drawClassABOutputWave = () => {
      const cycleWidth = width / 3;
      const scrollOffset = (time * 5) % cycleWidth;
      
      // Draw positive half with slight crossover (green)
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        let y = Math.sin(t) * (height / 8) * amplitude; // Reduced to 1/8 height
        // Draw positive half with slight crossover
        y = y > -0.1 ? height / 2 - y : height / 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Draw negative half with slight crossover (red)
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        let y = Math.sin(t) * (height / 8) * amplitude; // Reduced to 1/8 height
        // Draw negative half with slight crossover
        y = y < 0.1 ? height / 2 - y : height / 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    };

    // Class-C amplifier output with continuous flow
    const drawClassCOutputWave = () => {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const cycleWidth = width / 3;
      const scrollOffset = (time * 5) % cycleWidth;
      
      for (let x = 0; x <= width; x++) {
        const position = (x + scrollOffset) % width;
        const t = position / cycleWidth * 2 * Math.PI;
        let y = Math.sin(t) * (height / 8) * amplitude; // Reduced to 1/8 height
        // Only draw the peaks of positive half cycles
        y = y > 0.5 ? height / 2 - y : height / 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    };

    const render = () => {
      drawGrid();
      
      if (type === 'input') {
        drawInputWave();
      } else if (type === 'output') {
        switch (simulationType) {
          case 'class-a':
            drawClassAOutputWave();
            break;
          case 'class-ab':
            drawClassABOutputWave();
            break;
          case 'class-c':
            drawClassCOutputWave();
            break;
          case 'class-b':
          default:
            drawClassBOutputWave();
            break;
        }
      }
    };

    // Set up animation loop
    let animationFrame;
    const animate = () => {
      render();
      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [type, isRunning, time, amplitude, simulationType]);

  return (
    <div className="waveform-grid w-full h-full">
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={300} 
        className="w-full h-full"
      />
    </div>
  );
};

export default WaveformGraph;
