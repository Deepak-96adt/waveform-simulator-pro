
import React, { createContext, useState, useContext, useEffect } from 'react';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5); // 1-10 range
  const [amplitude, setAmplitude] = useState(1);
  const [time, setTime] = useState(0);
  const [lastStoppedTime, setLastStoppedTime] = useState(0);
  const [simulationType, setSimulationType] = useState('class-b');

  // Calculate the actual speed in milliseconds (inverted: higher = faster)
  const speedInMs = 11 - speed; // 10 -> 1000ms, 1 -> 10000ms

  useEffect(() => {
    let animationFrame;
    
    if (isRunning) {
      const updateTime = () => {
        setTime(prevTime => prevTime + 0.01);
        animationFrame = requestAnimationFrame(updateTime);
      };
      
      animationFrame = requestAnimationFrame(updateTime);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRunning]);

  // Update CSS variable for animation speed
  useEffect(() => {
    document.documentElement.style.setProperty('--wave-speed', `${speedInMs}s`);
  }, [speedInMs]);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setLastStoppedTime(time);
  };

  const restartSimulation = () => {
    setTime(lastStoppedTime);
    setIsRunning(true);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setLastStoppedTime(0);
  };

  const changeSimulationType = (type) => {
    setSimulationType(type);
    resetSimulation();
  };

  return (
    <SimulationContext.Provider
      value={{
        isRunning,
        speed,
        amplitude,
        time,
        simulationType,
        startSimulation,
        stopSimulation,
        restartSimulation,
        resetSimulation,
        setSpeed,
        setAmplitude,
        changeSimulationType
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === null) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
