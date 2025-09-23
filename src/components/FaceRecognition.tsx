import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

interface FaceRecognitionProps {
  onVerified: () => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onVerified }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        console.log("✅ Models loaded");
      } catch (err) {
        console.error("Model loading failed:", err);
      }
    };

    // Start camera
    const startVideo = async () => {
      if (!videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        // Wait until video metadata is loaded
        await new Promise<void>((resolve) => {
          videoRef.current?.addEventListener("loadedmetadata", () => resolve(), {
            once: true,
          });
        });

        await videoRef.current.play();
        console.log("📷 Camera started");
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    loadModels().then(startVideo);

    // Stop camera if component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let verified = false;
    const interval = setInterval(async () => {
      if (!videoRef.current || verified) return;
      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
          console.log("✅ Face detected! Attendance marked.");
          verified = true;

          // Stop camera after attendance is marked
          if (videoRef.current?.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
          }

          onVerified();
        }
      } catch (err) {
        console.error("Face detection error:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onVerified]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-64 h-48 border-2 border-blue-500 rounded-lg"
      />
      <p className="mt-2 text-sm text-gray-600">
        Align your face in the camera view
      </p>
    </div>
  );
};

export default FaceRecognition;
