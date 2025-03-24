
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const NavigationControls = () => {
  const navigate = useNavigate();
  const { resetSimulation, changeSimulationType, simulationType } = useSimulation();

  const handlePreviousSimulation = () => {
    const simulations = ['class-a', 'class-b', 'class-ab', 'class-c'];
    const currentIndex = simulations.indexOf(simulationType);
    const prevIndex = (currentIndex - 1 + simulations.length) % simulations.length;
    changeSimulationType(simulations[prevIndex]);
  };

  const handleNextSimulation = () => {
    const simulations = ['class-a', 'class-b', 'class-ab', 'class-c'];
    const currentIndex = simulations.indexOf(simulationType);
    const nextIndex = (currentIndex + 1) % simulations.length;
    changeSimulationType(simulations[nextIndex]);
  };

  const handleQuit = () => {
    resetSimulation();
    navigate('/');
  };

  return (
    <div className="flex justify-end gap-4">
      <button
        className="nav-button flex items-center justify-center"
        onClick={handlePreviousSimulation}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Previous
      </button>
      
      <button
        className="nav-button flex items-center justify-center"
        onClick={handleNextSimulation}
      >
        Next
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
      
      <button
        className="nav-button flex items-center justify-center"
        onClick={handleQuit}
      >
        Quit
        <X className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default NavigationControls;
