
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const { changeSimulationType } = useSimulation();

  const handleSimulationSelect = (type) => {
    changeSimulationType(type);
    navigate('/simulation');
  };

  const simulationOptions = [
    {
      id: 'class-b',
      title: 'Class-B Power Amplifier',
      description: 'Push-pull design with 180° conduction angle, balancing efficiency and fidelity.',
      primary: true
    },
    {
      id: 'class-a',
      title: 'Class-A Amplifier',
      description: 'Full 360° conduction cycle with high linearity but lower efficiency.',
      primary: false
    },
    {
      id: 'class-ab',
      title: 'Class-AB Amplifier',
      description: 'Hybrid design that reduces crossover distortion while maintaining good efficiency.',
      primary: false
    },
    {
      id: 'class-c',
      title: 'Class-C Amplifier',
      description: 'High efficiency with conduction angle less than 180°, used in tuned applications.',
      primary: false
    },
    {
      id: 'frequency',
      title: 'Frequency Response Visualization',
      description: 'Visual representation of amplifier frequency characteristics.',
      primary: false,
      disabled: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-simulator-background flex flex-col p-8"
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-2 text-simulator-text"
        >
          Power Amplifier Simulation Catalog
        </motion.h1>
        
        <motion.p 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-gray-300 mb-12"
        >
          Select an amplifier simulation to explore its characteristics
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {simulationOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <button
                onClick={() => !option.disabled && handleSimulationSelect(option.id)}
                disabled={option.disabled}
                className={`
                  w-full h-full p-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100
                  ${option.primary 
                    ? 'bg-simulator-border text-white border-2 border-simulator-positive' 
                    : 'bg-simulator-panel text-simulator-text border-2 border-simulator-border'}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <h2 className="text-xl font-bold mb-3">{option.title}</h2>
                <p className="text-sm opacity-80">{option.description}</p>
                {option.disabled && (
                  <div className="mt-2 text-xs bg-black/20 inline-block px-2 py-1 rounded">
                    Coming Soon
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 text-center text-gray-400 text-sm"
      >
        <p>Interactive Electronics Educational Simulator | Waveform Simulator Pro</p>
      </motion.footer>
    </motion.div>
  );
};

export default Home;
