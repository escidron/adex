import QRCode from "react-qr-code";

export default function QrCodeComponent({ value }) {
  return (
    <div className="p-4 bg-white border rounded-md mt-[40px]">
        <QRCode value={value} size={150}/>
    </div>
  )
}
