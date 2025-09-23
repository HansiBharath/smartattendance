import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface Props {
  onScan: (data: string) => void;
  onError?: (err: any) => void;
}

const QrScanner: React.FC<Props> = ({ onScan, onError }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  // Type-safe ref for Html5Qrcode instance
  const qrScannerRef = useRef<InstanceType<typeof Html5Qrcode> | null>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const qrScanner = new Html5Qrcode(qrRef.current.id);
    qrScannerRef.current = qrScanner;

    qrScanner
      .start(
        { facingMode: "environment" }, // use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText); // call onScan only
        },
        (err) => {
          if (onError) onError(err);
        }
      )
      .catch((err) => console.error("Camera start failed:", err));

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            qrScannerRef.current?.clear().catch(() => {});
          });
      }
    };
  }, [onScan, onError]);

  return (
    <div>
      <div id="qr-reader" ref={qrRef} style={{ width: "100%" }} />
      <button
        onClick={() => {
          if (qrScannerRef.current) {
            qrScannerRef.current
              .stop()
              .then(() => console.log("Camera stopped manually."))
              .catch(() => {});
          }
        }}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Stop Camera
      </button>
    </div>
  );
};

export default QrScanner;
