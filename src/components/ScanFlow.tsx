import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';

interface ScanFlowProps {
  onScanComplete: (pillData: any) => void;
  onBack: () => void;
}

const ScanFlow = ({ onScanComplete, onBack }: ScanFlowProps) => {
  const [step, setStep] = useState<'camera' | 'scanning' | 'results'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [pillData, setPillData] = useState<any>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      startScanning(imageSrc);
    }
  }, [webcamRef]);

  const startScanning = async (image: string) => {
    setStep('scanning');
    
    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setScanProgress(i);
    }

    // TODO: Replace with actual Gemini API call
    const mockPillData = {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      timing: 'Morning with food',
      quantity: 30,
      color: 'from-blue-400 to-blue-600'
    };

    setPillData(mockPillData);
    setStep('results');
    
    setTimeout(() => {
      onScanComplete(mockPillData);
    }, 2000);
  };

  const retake = () => {
    setCapturedImage(null);
    setPillData(null);
    setScanProgress(0);
    setStep('camera');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 pt-24"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="absolute top-24 left-8 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2 font-semibold text-gray-700"
      >
        ← Back
      </motion.button>

      <AnimatePresence mode="wait">
        {step === 'camera' && (
          <motion.div
            key="camera"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-8" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Scan Your Pill Bottle
            </h2>
            
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 bg-black"
              whileHover={{ scale: 1.02 }}
            >
              {/* Scanning Frame Animation */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Corner Brackets */}
                {[[0,0], [0,1], [1,0], [1,1]].map(([x, y], i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 border-4 border-cyan-400"
                    style={{
                      top: y ? 'auto' : 16,
                      bottom: y ? 16 : 'auto',
                      left: x ? 'auto' : 16,
                      right: x ? 16 : 'auto',
                      borderTop: y ? 'none' : undefined,
                      borderBottom: y ? undefined : 'none',
                      borderLeft: x ? 'none' : undefined,
                      borderRight: x ? undefined : 'none',
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
                
                {/* Scanning Line */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
                  animate={{
                    top: ['5%', '95%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>

              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-[640px] h-[480px]"
                videoConstraints={{
                  facingMode: 'environment' // Use back camera on mobile
                }}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={capture}
              className="px-16 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold rounded-full shadow-xl"
            >
              📸 Capture Photo
            </motion.button>

            <p className="mt-6 text-gray-600 text-lg">
              Position the prescription label in the frame
            </p>
          </motion.div>
        )}

        {step === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-8 text-gray-800">
              Analyzing Prescription...
            </h2>

            <div className="relative w-96 h-96 mb-8">
              {/* Captured Image */}
              <motion.img
                src={capturedImage || ''}
                alt="Captured"
                className="w-full h-full object-cover rounded-3xl"
                animate={{
                  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Scanning Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-3xl" />
              
              {/* Orbiting Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: Math.cos((i / 12) * Math.PI * 2) * 180,
                    y: Math.sin((i / 12) * Math.PI * 2) * 180,
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-96 mx-auto">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-gray-600 font-medium text-lg">{scanProgress}% Complete</p>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-cyan-500 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 'results' && pillData && (
          <motion.div
            key="results"
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-8xl mb-4">💊</div>
            </motion.div>
            
            <h2 className="text-5xl font-bold text-gray-800 mb-8">
              Prescription Identified!
            </h2>

            <motion.div
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-[500px] mx-auto border border-white/40"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`w-32 h-32 mx-auto mb-8 bg-gradient-to-br ${pillData.color} rounded-full shadow-xl flex items-center justify-center`}>
                <span className="text-5xl text-white font-bold">
                  {pillData.dosage}
                </span>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-800 mb-8">
                {pillData.name}
              </h3>

              <div className="space-y-4 text-left">
                <InfoRow label="Dosage" value={pillData.dosage} />
                <InfoRow label="Frequency" value={pillData.frequency} />
                <InfoRow label="Timing" value={pillData.timing} />
                <InfoRow label="Quantity" value={`${pillData.quantity} pills`} />
              </div>
            </motion.div>

            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={retake}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-full"
              >
                Retake Photo
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-green-600 font-semibold text-xl"
            >
              ✓ Adding to your schedule...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200">
    <span className="text-gray-500 font-medium text-lg">{label}:</span>
    <span className="text-gray-800 font-bold text-lg">{value}</span>
  </div>
);

export default ScanFlow;