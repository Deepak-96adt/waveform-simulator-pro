
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveformGraph from '../components/WaveformGraph';
import CircuitDiagram from '../components/CircuitDiagram';
import SimulationControls from '../components/SimulationControls';
import NavigationControls from '../components/NavigationControls';
import InstructionPanel from '../components/InstructionPanel';
import { useSimulation } from '../context/SimulationContext';
import { motion } from 'framer-motion';

const ClassBSimulation = () => {
  const navigate = useNavigate();
  const { simulationType, resetSimulation } = useSimulation();
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      resetSimulation();
    };
  }, [resetSimulation]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen max-w-screen bg-simulator-background p-4 flex flex-col gap-4"
    >
      {/* Top Section - Main Simulation Display */}
      <motion.div 
        variants={itemVariants}
        className="simulation-panel flex flex-col lg:flex-row gap-4 p-4"
      >
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold mb-2 text-center">Input Signal</h2>
          <div className="flex-grow">
            <WaveformGraph type="input" />
          </div>
        </div>
        
        <div className="flex-grow">
          <CircuitDiagram />
        </div>
        
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold mb-2 text-center">Output Signal</h2>
          <div className="flex-grow">
            <WaveformGraph type="output" />
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Section - Controls and Instructions */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-4">
        {/* Instructions Panel */}
        <div className="lg:w-1/3 lg:h-[300px]">
          <InstructionPanel />
        </div>
        
        {/* Controls Panel */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="simulation-panel">
            <SimulationControls />
          </div>
          
          <div className="simulation-panel">
            <NavigationControls />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClassBSimulation;
