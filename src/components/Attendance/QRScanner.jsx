import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera, VideoOff, AlertTriangle, QrCode } from 'lucide-react';

const qrcodeRegionId = "qr-code-full-region";

export function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode(qrcodeRegionId);
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Failed to stop scanner", err));
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    setScanResult(null);
    setIsScanning(true);
    setCameraStarted(false);

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScanResult({ success: true, message: 'Attendance marked successfully!', data: decodedText });
          stopScanner();
        },
        () => {} // Ignore errors
      );
      setCameraStarted(true);
    } catch (err) {
      setError("Failed to start QR scanner. Please grant camera permissions and try again.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop();
    }
    setIsScanning(false);
    setCameraStarted(false);
  };

  const handleRescan = () => {
    setScanResult(null);
    startScanner();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-600">Point your camera at the QR code to mark your attendance.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="max-w-md mx-auto text-center">
          <div id={qrcodeRegionId} className="w-full border-2 border-dashed rounded-lg bg-gray-50 min-h-[300px]" />

          {error && (
            <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-3" />
              <span>{error}</span>
            </div>
          )}

          {!isScanning && !scanResult && (
            <button onClick={startScanner} className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center">
              <Camera className="h-5 w-5 mr-2" /> Start Scanner
            </button>
          )}

          {isScanning && !cameraStarted && (
             <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Initializing camera...</p>
             </div>
          )}

          {isScanning && cameraStarted && (
            <button onClick={stopScanner} className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center">
              <VideoOff className="h-5 w-5 mr-2" /> Stop Scanning
            </button>
          )}
          
          {scanResult && (
            <div className={`mt-4 p-4 rounded-md ${scanResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center justify-center mb-2">
                {scanResult.success ? <CheckCircle className="h-8 w-8 text-green-600" /> : <XCircle className="h-8 w-8 text-red-600" />}
              </div>
              <p className={`font-medium text-center ${scanResult.success ? 'text-green-900' : 'text-red-900'}`}>{scanResult.message}</p>
              <p className="text-xs text-gray-500 mt-1 break-all">Data: {scanResult.data}</p>
              <button onClick={handleRescan} className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
                Scan Another Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
