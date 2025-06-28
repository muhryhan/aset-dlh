import BarcodeScanner from "../../components/scan/barcodeScanner";

const ScanPage = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-bold mt-4 text-white">
        Scan Barcode
      </h1>
      <BarcodeScanner />
    </div>
  );
};

export default ScanPage;
