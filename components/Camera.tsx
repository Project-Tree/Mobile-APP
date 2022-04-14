import { useState, useRef, useCallback, useEffect, FC } from "react";
import style from "./Camera.module.css";

import dynamic from "next/dynamic";
const QrReader = dynamic(() =>
  import("react-qr-reader").then((module) => module.QrReader)
);

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Camera: FC<Props> = ({ isOpen, close }) => {
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
  const [qrcode, setQRCode] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const getCamera = useCallback(() => {
    if (typeof navigator === "undefined" || typeof document === "undefined")
      return;
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment", width: 400, height: 480 },
      })
      .then((stream: MediaStream) => {
        if (videoRef.current === null) return;
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsVideoReady(true);
        };
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCamera();
  }, []);

  const closeCamera = useCallback(() => {
    if (videoRef.current === null) return;
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    videoRef.current.srcObject = null;
    close();
    setIsVideoReady(false);
  }, []);

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      <div
        className={style.cameraHeader}
        onClick={() => {
          if (isOpenOverlay) {
            setIsOpenOverlay(false);
          } else if (!isVideoReady) {
            // 비디오가 준비중일 때는 아무 작동도 하지 않습니다.
          } else {
            closeCamera();
          }
        }}
      ></div>
      <div className={style.cameraBody} onClick={() => setIsOpenOverlay(false)}>
        <QrReader
          constraints={{ facingMode: "user" }}
          containerStyle={{ display: "none" }}
          onResult={(result, err) => {
            if (result) {
              setIsOpenOverlay(true);
              setQRCode(result.getText());
            }
            if (err) {
              // qr이 인식되지 않습니다.
            }
          }}
        ></QrReader>
        <video style={{ height: "100%" }} ref={videoRef} autoPlay></video>
        {isVideoReady ? (
          <div className={`${style.overlay} ${style.top}`}>
            QR 코드를 스캔해주세요
          </div>
        ) : (
          <div className={`${style.overlay} ${style.loading}`}></div>
        )}
        {isOpenOverlay && (
          <div
            className={`${style.overlay} ${style.bottom}`}
            onClick={() => {
              if (typeof window === "undefined") return;
              window.open(qrcode, "Payment");
            }}
          >
            {qrcode}
          </div>
        )}
      </div>
      <div
        className={style.cameraFooter}
        onClick={() => {
          if (isOpenOverlay) {
            setIsOpenOverlay(false);
          } else if (!isVideoReady) {
            // 비디오가 준비중일 때는 아무 작동도 하지 않습니다.
          } else {
            closeCamera();
          }
        }}
      ></div>
    </div>
  );
};

export default Camera;
