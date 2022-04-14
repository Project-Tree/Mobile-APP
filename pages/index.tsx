import style from "./index.module.css";
import useModal from "../hooks/useModal";
import useWallet from "./useWallet";
import { ReactElement } from "react/index";
import { parseEther } from "ethers/lib/utils";

import dynamic from "next/dynamic";
const RadioButtonCheckedIcon = dynamic(
  () => import("@mui/icons-material/RadioButtonChecked")
);
const Camera = dynamic(() => import("../components/Camera"));

export default function Index(): ReactElement {
  const [provider, , tre] = useWallet();
  const [isOpenCamera, openCamera, closeCamera] = useModal();

  const swapETHToTRE = (ethToSwap: string) => async () => {
    const signer = provider.getSigner();
    signer.sendTransaction({
      to: tre?.address,
      value: parseEther(ethToSwap),
    });
  };

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.wallet}>
          내 지갑 <p>120 TRE</p>
        </div>
        <div
          className={style.charge}
          onClick={() => {
            // /*swapETHToTRE("100")
          }}
        >
          충전하기
        </div>
        <div className={style.usage}>사용내역</div>
        <div className={style.find}>
          주변 음식점 <p>찾기</p>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.cameraIcon} onClick={openCamera}>
          <RadioButtonCheckedIcon sx={{ "font-size": "35px" }} />
        </div>
      </div>
      {isOpenCamera && (
        <Camera isOpen={isOpenCamera} close={closeCamera}></Camera>
      )}
    </div>
  );
}
