
import { useSimulation } from '../context/SimulationContext';

const InstructionPanel = () => {
  const { simulationType } = useSimulation();

  const getInstructions = () => {
    switch (simulationType) {
      case 'class-a':
        return (
          <>
            <h3 className="text-lg font-bold">HOW TO USE IT</h3>
            <h4 className="text-lg font-bold mt-2">Class-A Power amplifier.</h4>
            <ol className="mt-4 text-left list-decimal pl-6 space-y-2">
              <li>Vary the speed of simulation by changing speed scroll.</li>
              <li>In Class-A Amplifier, the transistor conducts for the full cycle (360°) of the input signal.</li>
              <li>The output is an amplified version of the input, preserving its shape but with increased amplitude.</li>
              <li>Class-A amplifiers provide excellent linearity but are inefficient (max theoretical efficiency of 25%).</li>
              <li>Observe how the transistor remains active throughout the entire cycle.</li>
            </ol>
          </>
        );
      
      case 'class-ab':
        return (
          <>
            <h3 className="text-lg font-bold">HOW TO USE IT</h3>
            <h4 className="text-lg font-bold mt-2">Class-AB Power amplifier.</h4>
            <ol className="mt-4 text-left list-decimal pl-6 space-y-2">
              <li>Vary the speed of simulation by changing speed scroll.</li>
              <li>Class-AB combines features of both Class-A and Class-B amplifiers.</li>
              <li>Both transistors conduct slightly more than half-cycle, creating a small overlap in conduction.</li>
              <li>This design eliminates crossover distortion present in Class-B amplifiers.</li>
              <li>Observe the smooth transition between the upper (green) and lower (red) transistors.</li>
              <li>The small bias ensures that both transistors are never completely off at the zero-crossing points.</li>
            </ol>
          </>
        );
      
      case 'class-c':
        return (
          <>
            <h3 className="text-lg font-bold">HOW TO USE IT</h3>
            <h4 className="text-lg font-bold mt-2">Class-C Power amplifier.</h4>
            <ol className="mt-4 text-left list-decimal pl-6 space-y-2">
              <li>Vary the speed of simulation by changing speed scroll.</li>
              <li>Class-C amplifiers conduct for less than half-cycle of the input signal.</li>
              <li>The transistor is biased below cutoff and only conducts during peak portions of the input signal.</li>
              <li>This design is highly efficient (up to 90%) but introduces significant distortion.</li>
              <li>Class-C amplifiers are typically used with a tuned circuit (tank circuit) that helps restore the waveform shape.</li>
              <li>Observe how the output only shows peaks of the waveform, not the complete signal.</li>
            </ol>
          </>
        );
      
      case 'class-b':
      default:
        return (
          <>
            <h3 className="text-lg font-bold">HOW TO USE IT</h3>
            <h4 className="text-lg font-bold mt-2">Class-B Power amplifier.</h4>
            <ol className="mt-4 text-left list-decimal pl-6 space-y-2">
              <li>Vary the speed of simulation by changing speed scroll.</li>
              <li>In Class-B Amplifier, Push-Pull Amplifier is used to obtain 180° swing in collector current.</li>
              <li>During the first half-cycle of operation, upper transistor is driven into conduction, whereas lower transistor is driven off, the result is positive half-cycle in the output.</li>
              <li>During the second half-cycle, lower transistor conducts and upper transistor is off, resulting in the negative half-cycle in the output.</li>
              <li>This creates a complete push-pull output waveform combining both halves.</li>
              <li>Note the crossover distortion that occurs when both transistors are briefly off during the transition between positive and negative half-cycles.</li>
            </ol>
          </>
        );
    }
  };

  return (
    <div className="instructions-panel w-full h-full overflow-auto p-4">
      <div className="text-center">
        {getInstructions()}
      </div>
    </div>
  );
};

export default InstructionPanel;
