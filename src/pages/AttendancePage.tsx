import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AttendancePage: React.FC = () => {
  const [registerNo, setRegisterNo] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // ✅ API call for QR Scan validation
  const handleQRScan = async () => {
    try {
      const res = await fetch("http://localhost:5000/scan-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: registerNo }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setCurrentStep(3);
      } else {
        alert("QR validation failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to QR validation service");
    }
  };

  // ✅ API call for Face Recognition validation
  const handleFaceRecognition = async () => {
    try {
      const res = await fetch("http://localhost:5000/face-recognition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: registerNo }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setCurrentStep(4);
        setAttendanceMarked(true);
      } else {
        alert("Face recognition failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to Face Recognition service");
    }
  };

  // ✅ Just moves to next step when needed
  const handleNext = () => {
    if (currentStep === 1 && registerNo.trim() === "") {
      alert("Please enter Register No.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Attendance System
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Register No."
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <Button
                onClick={handleNext}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Next
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 text-center">
              <p className="text-lg">Step 2: Scan QR Code</p>
              <Button
                onClick={handleQRScan}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                QR Code Scanned
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 text-center">
              <p className="text-lg">Step 3: Face Recognition</p>
              <Button
                onClick={handleFaceRecognition}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Face Recognized
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              {attendanceMarked ? (
                <p className="text-green-600 font-bold">
                  ✅ Attendance Marked Successfully
                </p>
              ) : (
                <p className="text-red-600 font-bold">
                  ❌ Attendance Not Marked
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
