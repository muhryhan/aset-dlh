import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";

const BarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(true);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");
        const selectedDeviceId = videoDevices[0]?.deviceId;

        if (!selectedDeviceId) {
          setError("No video input devices found.");
          return;
        }

        await codeReaderRef.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              setResult(result.getText());
              setScanning(false);
              codeReaderRef.current?.reset?.();
            }

            if (err && !(err instanceof NotFoundException)) {
              setError(err.message);
            }
          }
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred.");
        }
      }
    };

    if (scanning) {
      startScanner();
    }

    return () => {
      (codeReaderRef.current as any)?.reset?.();
    };
  }, [scanning]);

  const resetScanner = () => {
    setResult(null);
    setError(null);
    setScanning(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    try {
      const result = await codeReaderRef.current?.decodeFromImageUrl(imageUrl);
      if (result) {
        setResult(result.getText());
        setScanning(false);
        URL.revokeObjectURL(imageUrl); // Bersihkan memory
      } else {
        setError("No barcode found in image.");
      }
    } catch (err) {
      setError("Failed to decode image.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 space-y-4">
      {!result && (
        <video
          ref={videoRef}
          className="w-full max-w-md rounded-lg shadow-lg"
          autoPlay
          muted
          playsInline
        />
      )}

      <div className="flex flex-col items-center space-y-2">
        <label className="bg-white text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
          📁 Upload Gambar Barcode
          <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
        </label>

        {result ? (
          <div className="text-center">
            <p className="text-green-400 font-semibold text-lg">✅ Barcode: {result}</p>
            <button
              onClick={resetScanner}
              className="mt-3 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Scan Lagi
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">📷 Arahkan kamera ke barcode atau upload gambar</p>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center">⚠️ {error}</p>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
