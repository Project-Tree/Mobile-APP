import { parseEther } from "ethers/lib/utils";
import style from "./index.module.css";
import useMetamask from "../hooks/useMetamask";
import useModal from "../hooks/useModal";
import { ReactElement } from "react/index";

import dynamic from "next/dynamic";
const RadioButtonCheckedIcon = dynamic(
  () => import("@mui/icons-material/RadioButtonChecked")
);
const Camera = dynamic(() => import("../components/Camera"));

export default function Index(): ReactElement {
  const [provider, , tre] = useMetamask();
  const [isOpenCamera, openCamera, closeCamera] = useModal();

  const swapETHToTRE = (ethToSwap: string) => async () => {
    if (provider !== undefined) {
      const signer = provider.getSigner();
      signer.sendTransaction({
        to: tre?.address,
        value: parseEther(ethToSwap),
      });
    }
  };

  // const purchaseProduct = (to: string, cost: number) => () => {
  //   tre?.transfer(to, cost);
  // };

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.wallet}>
          내 지갑 <p>120 TRE</p>
        </div>
        <div className={style.charge} onClick={swapETHToTRE("100")}>
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
