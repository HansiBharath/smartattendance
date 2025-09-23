declare module "react-qr-scanner" {
  import * as React from "react";

  interface QrReaderProps {
    delay?: number;
    onError: (error: any) => void;
    onScan: (result: string | null) => void;
    style?: React.CSSProperties;
    className?: string;
  }

  export default class QrReader extends React.Component<QrReaderProps> {}
}
declare module "html5-qrcode";
declare module "*.tsx";

