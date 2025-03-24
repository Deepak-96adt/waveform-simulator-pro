
import { useSimulation } from '../context/SimulationContext';

const CircuitDiagram = () => {
  const { simulationType, time, isRunning } = useSimulation();

  const getAnimationStyle = (cycleType) => {
    if (!isRunning) return {};
    
    // Calculate the sine value for the current time
    const sineValue = Math.sin(time * 5);
    
    // For positive half-cycles (upper transistor)
    if (cycleType === 'positive' && sineValue > 0) {
      return { filter: 'drop-shadow(0 0 5px #00ff00)' };
    }
    
    // For negative half-cycles (lower transistor)
    if (cycleType === 'negative' && sineValue < 0) {
      return { filter: 'drop-shadow(0 0 5px #ff0000)' };
    }
    
    return {};
  };

  const renderClassBCircuit = () => (
    <div className="relative w-full h-full bg-[#ffffcc] p-4 flex items-center justify-center">
      {/* Main circuit frame */}
      <svg viewBox="0 0 400 300" className="max-w-full max-h-full">
        {/* Input lines */}
        <line x1="20" y1="150" x2="100" y2="150" stroke="black" strokeWidth="2" />
        <line x1="40" y1="110" x2="40" y2="190" stroke="black" strokeWidth="2" />
        <line x1="60" y1="120" x2="60" y2="180" stroke="black" strokeWidth="2" />
        
        {/* Upper transistor (NPN) */}
        <circle cx="150" cy="100" r="25" fill="#cccccc" stroke="black" strokeWidth="2" style={getAnimationStyle('positive')} />
        <text x="150" y="105" textAnchor="middle" fontSize="14">NPN</text>
        
        {/* Lower transistor (NPN) */}
        <circle cx="150" cy="200" r="25" fill="#cccccc" stroke="black" strokeWidth="2" style={getAnimationStyle('negative')} />
        <text x="150" y="205" textAnchor="middle" fontSize="14">NPN</text>
        
        {/* Power supply lines */}
        <line x1="150" y1="75" x2="150" y2="40" stroke="black" strokeWidth="2" />
        <text x="165" y="50" fontSize="14">Vcc</text>
        
        {/* Ground symbol */}
        <line x1="150" y1="225" x2="150" y2="260" stroke="black" strokeWidth="2" />
        <line x1="140" y1="260" x2="160" y2="260" stroke="black" strokeWidth="2" />
        <line x1="145" y1="265" x2="155" y2="265" stroke="black" strokeWidth="2" />
        <line x1="148" y1="270" x2="152" y2="270" stroke="black" strokeWidth="2" />
        
        {/* Resistors */}
        <path d="M150 40 L180 40 Z" stroke="black" strokeWidth="2" />
        <path d="M180 40 Q185 40 185 45 Q185 50 175 50 Q165 50 175 55 Q185 60 175 65 Q165 70 175 75 Q185 80 185 85 Q185 90 180 90 L150 90 Z" fill="none" stroke="black" strokeWidth="2" />
        
        {/* Connecting wires */}
        <line x1="100" y1="100" x2="125" y2="100" stroke="black" strokeWidth="2" />
        <line x1="100" y1="200" x2="125" y2="200" stroke="black" strokeWidth="2" />
        <line x1="175" y1="100" x2="210" y2="100" stroke="black" strokeWidth="2" />
        <line x1="175" y1="200" x2="210" y2="200" stroke="black" strokeWidth="2" />
        <line x1="210" y1="100" x2="210" y2="150" stroke="black" strokeWidth="2" />
        <line x1="210" y1="200" x2="210" y2="150" stroke="black" strokeWidth="2" />
        
        {/* Output lines */}
        <line x1="210" y1="150" x2="280" y2="150" stroke="black" strokeWidth="2" />
        <line x1="260" y1="110" x2="260" y2="190" stroke="black" strokeWidth="2" />
        <line x1="280" y1="120" x2="280" y2="180" stroke="black" strokeWidth="2" />
        
        {/* Green waveform snippet */}
        <g transform="translate(160, 30)" style={getAnimationStyle('positive')}>
          <rect x="0" y="0" width="80" height="40" fill="black" />
          <path d="M0 20 Q20 20 25 5 Q30 -10 40 5 Q50 20 55 5 Q60 -10 80 5" 
                fill="none" stroke="#00ff00" strokeWidth="2" />
        </g>
        
        {/* Red waveform snippet */}
        <g transform="translate(160, 230)" style={getAnimationStyle('negative')}>
          <rect x="0" y="0" width="80" height="40" fill="black" />
          <path d="M0 20 Q20 20 25 35 Q30 50 40 35 Q50 20 55 35 Q60 50 80 35" 
                fill="none" stroke="#ff0000" strokeWidth="2" />
        </g>
        
        {/* Labels */}
        <text x="150" y="170" textAnchor="middle" fontSize="16">E</text>
        <text x="250" y="140" textAnchor="middle" fontSize="16">Vcc</text>
      </svg>
    </div>
  );

  const renderClassACircuit = () => (
    <div className="relative w-full h-full bg-[#ffffcc] p-4 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="max-w-full max-h-full">
        {/* Basic Class-A circuit */}
        <circle cx="150" cy="150" r="25" fill="#cccccc" stroke="black" strokeWidth="2" />
        <text x="150" y="155" textAnchor="middle" fontSize="14">NPN</text>
        
        <line x1="20" y1="150" x2="125" y2="150" stroke="black" strokeWidth="2" />
        <line x1="175" y1="150" x2="280" y2="150" stroke="black" strokeWidth="2" />
        
        <line x1="150" y1="125" x2="150" y2="40" stroke="black" strokeWidth="2" />
        <text x="165" y="50" fontSize="14">Vcc</text>
        
        <line x1="150" y1="175" x2="150" y2="260" stroke="black" strokeWidth="2" />
        <line x1="140" y1="260" x2="160" y2="260" stroke="black" strokeWidth="2" />
        <line x1="145" y1="265" x2="155" y2="265" stroke="black" strokeWidth="2" />
        <line x1="148" y1="270" x2="152" y2="270" stroke="black" strokeWidth="2" />
        
        <text x="240" y="145" textAnchor="middle" fontSize="16">Output</text>
        <text x="60" y="145" textAnchor="middle" fontSize="16">Input</text>
      </svg>
    </div>
  );

  const renderClassABCircuit = () => (
    <div className="relative w-full h-full bg-[#ffffcc] p-4 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="max-w-full max-h-full">
        {/* Similar to Class-B but with biasing */}
        <circle cx="150" cy="100" r="25" fill="#cccccc" stroke="black" strokeWidth="2" style={getAnimationStyle('positive')} />
        <text x="150" y="105" textAnchor="middle" fontSize="14">NPN</text>
        
        <circle cx="150" cy="200" r="25" fill="#cccccc" stroke="black" strokeWidth="2" style={getAnimationStyle('negative')} />
        <text x="150" y="205" textAnchor="middle" fontSize="14">PNP</text>
        
        {/* Biasing components */}
        <circle cx="100" cy="150" r="15" fill="#ffdddd" stroke="black" strokeWidth="2" />
        <text x="100" y="155" textAnchor="middle" fontSize="10">Bias</text>
        
        <line x1="20" y1="150" x2="85" y2="150" stroke="black" strokeWidth="2" />
        <line x1="115" y1="150" x2="125" y2="100" stroke="black" strokeWidth="2" />
        <line x1="115" y1="150" x2="125" y2="200" stroke="black" strokeWidth="2" />
        
        <line x1="175" y1="100" x2="210" y2="100" stroke="black" strokeWidth="2" />
        <line x1="175" y1="200" x2="210" y2="200" stroke="black" strokeWidth="2" />
        <line x1="210" y1="100" x2="210" y2="150" stroke="black" strokeWidth="2" />
        <line x1="210" y1="200" x2="210" y2="150" stroke="black" strokeWidth="2" />
        <line x1="210" y1="150" x2="280" y2="150" stroke="black" strokeWidth="2" />
        
        <text x="240" y="145" textAnchor="middle" fontSize="16">Output</text>
      </svg>
    </div>
  );

  const renderClassCCircuit = () => (
    <div className="relative w-full h-full bg-[#ffffcc] p-4 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="max-w-full max-h-full">
        {/* Class-C circuit with tank circuit */}
        <circle cx="150" cy="150" r="25" fill="#cccccc" stroke="black" strokeWidth="2" />
        <text x="150" y="155" textAnchor="middle" fontSize="14">NPN</text>
        
        {/* Tank circuit (inductor and capacitor) */}
        <circle cx="220" cy="100" r="20" fill="none" stroke="black" strokeWidth="2" />
        <line x1="210" y1="100" x2="230" y2="100" stroke="black" strokeWidth="2" />
        <line x1="220" y1="90" x2="220" y2="110" stroke="black" strokeWidth="2" />
        
        <path d="M220 120 Q220 125 215 125 Q210 125 210 130 Q210 135 215 135 Q220 135 220 140" fill="none" stroke="black" strokeWidth="2" />
        
        <line x1="175" y1="150" x2="220" y2="150" stroke="black" strokeWidth="2" />
        <line x1="220" y1="140" x2="220" y2="150" stroke="black" strokeWidth="2" />
        <line x1="220" y1="80" x2="220" y2="40" stroke="black" strokeWidth="2" />
        
        <line x1="150" y1="175" x2="150" y2="260" stroke="black" strokeWidth="2" />
        <line x1="140" y1="260" x2="160" y2="260" stroke="black" strokeWidth="2" />
        <line x1="145" y1="265" x2="155" y2="265" stroke="black" strokeWidth="2" />
        <line x1="148" y1="270" x2="152" y2="270" stroke="black" strokeWidth="2" />
        
        <line x1="20" y1="150" x2="125" y2="150" stroke="black" strokeWidth="2" />
        <line x1="220" y1="100" x2="280" y2="100" stroke="black" strokeWidth="2" />
        
        <text x="240" y="90" textAnchor="middle" fontSize="16">Output</text>
        <text x="60" y="145" textAnchor="middle" fontSize="16">Input</text>
      </svg>
    </div>
  );

  // Render the appropriate circuit diagram based on simulation type
  const renderCircuit = () => {
    switch (simulationType) {
      case 'class-a':
        return renderClassACircuit();
      case 'class-ab':
        return renderClassABCircuit();
      case 'class-c':
        return renderClassCCircuit();
      case 'class-b':
      default:
        return renderClassBCircuit();
    }
  };

  return (
    <div className="border-4 border-simulator-border h-full w-full overflow-hidden">
      {renderCircuit()}
    </div>
  );
};

export default CircuitDiagram;
