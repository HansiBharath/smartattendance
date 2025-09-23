import React, { useState } from "react";
import QrScanner from "C:/Users/mouni/smarta-access-hub/src/components/QrScanner";
import FaceRecognition from "C:/Users/mouni/smarta-access-hub/src/components/FaceRecognition";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Register No.", "Scan QR", "Face Recognition", "Completed"];

const AttendanceSteps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [qrData, setQRData] = useState<string | null>(null);
  const [faceVerified, setFaceVerified] = useState<boolean>(false);

  const handleQRScan = (data: string) => {
    setQRData(data);
    setCurrentStep(3);
  };

  const handleFaceVerified = () => {
    setFaceVerified(true);
    setCurrentStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  layout
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    backgroundColor: isCompleted
                      ? "#22c55e"
                      : isActive
                      ? "#2563eb"
                      : "#e5e7eb",
                    color: isCompleted || isActive ? "#fff" : "#374151",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: isCompleted
                      ? "#22c55e"
                      : isActive
                      ? "#2563eb"
                      : "#d1d5db",
                  }}
                >
                  {stepNum}
                </motion.div>
                <span
                  className={`mt-2 text-sm ${
                    isActive ? "font-semibold text-blue-600" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="bg-white shadow-md rounded-xl p-6 min-h-[250px]">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold">Step 1: Enter Register No.</h2>
              <input
                type="text"
                placeholder="Enter Register No."
                className="border rounded-lg px-3 py-2 w-full"
              />
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold">Step 2: Scan QR Code</h2>
              <QrScanner
                onScan={handleQRScan}
                onError={(err) => console.warn(err)}
              />
            </motion.div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold">Step 3: Face Recognition</h2>
              {!faceVerified ? (
                <FaceRecognition onVerified={handleFaceVerified} />
              ) : (
                <p className="text-green-600 font-semibold">
                  ✅ Face recognized successfully!
                </p>
              )}
            </motion.div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h2 className="text-xl font-bold text-green-600">
                🎉 Attendance Completed!
              </h2>
              <p className="text-gray-700">QR Result: {qrData}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AttendanceSteps;
