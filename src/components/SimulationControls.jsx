
import { useSimulation } from '../context/SimulationContext';
import { ArrowUp, ArrowDown, Play, Square, RefreshCw } from 'lucide-react';

const SimulationControls = () => {
  const { 
    isRunning, 
    speed, 
    startSimulation, 
    stopSimulation, 
    restartSimulation, 
    setSpeed
  } = useSimulation();

  const handleSpeedChange = (increment) => {
    setSpeed(prev => {
      const newSpeed = prev + increment;
      return Math.min(Math.max(newSpeed, 1), 10); // Clamp between 1-10
    });
  };

  return (
    <div className="simulation-panel w-full h-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xl font-bold text-simulator-text">Speed of simulation</h3>
        
        <div className="flex items-center justify-center border-4 border-simulator-border bg-simulator-control rounded-none h-16 w-16 relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col">
            <button 
              className="flex-1 flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors"
              onClick={() => handleSpeedChange(1)}
            >
              <ArrowUp className="w-5 h-5 text-simulator-controlText" />
            </button>
            
            <div className="h-px bg-simulator-border w-full"></div>
            
            <button 
              className="flex-1 flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors"
              onClick={() => handleSpeedChange(-1)}
            >
              <ArrowDown className="w-5 h-5 text-simulator-controlText" />
            </button>
          </div>
          
          <div className="z-10 text-xl font-bold text-simulator-controlText bg-simulator-control px-1">
            {speed}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <button
          className="control-button flex-1 flex items-center justify-center gap-2"
          onClick={startSimulation}
          disabled={isRunning}
        >
          <Play className="w-5 h-5" />
          <span>Start</span>
        </button>
        
        <button
          className="control-button flex-1 flex items-center justify-center gap-2"
          onClick={restartSimulation}
          disabled={isRunning}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Restart</span>
        </button>
        
        <button
          className="control-button flex-1 flex items-center justify-center gap-2"
          onClick={stopSimulation}
          disabled={!isRunning}
        >
          <Square className="w-5 h-5" />
          <span>Stop</span>
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;
