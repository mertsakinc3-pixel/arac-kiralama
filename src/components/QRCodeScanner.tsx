"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { IoClose, IoQrCode } from "react-icons/io5";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function QRCodeScanner({ onScan, onClose }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = "qr-reader";

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const startScanner = async () => {
    try {
      setIsScanning(true);
      setError(null);

      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // QR kod bulunamadığında sürekli hata vermemesi için
          console.log("Scanning...", errorMessage);
        }
      );
    } catch (err) {
      console.error("QR Scanner Error:", err);
      setError("Kamera erişimi reddedildi veya kamera bulunamadı.");
      setIsScanning(false);
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <IoQrCode size={24} />
            QR Kod Okut
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
            <button
              onClick={startScanner}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              Tekrar Dene
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div
              id={qrCodeRegionId}
              className="rounded-lg overflow-hidden border-2 border-blue-500"
            />
            {isScanning && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-sm text-gray-600 mt-2">
                  QR kodu kamera karşısına tutun...
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 İpucu:</strong> Ruhsat üzerindeki QR kodu kameraya net bir
            şekilde gösterin. QR kod otomatik olarak okunacak ve bilgiler
            doldurulacaktır.
          </p>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          İptal
        </button>
      </div>
    </div>
  );
}

