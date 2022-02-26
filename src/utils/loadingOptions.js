
import * as success from "../assets/icon/81296-success.json";
import gift from "../assets/icon/Preloading-Momo-Mini-App-mini-mize.gif";
import Lottie from 'react-lottie';
const optionSuccess = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
export const Loading = () => {
    return(
        <div className="preLoader">
            {/* <Lottie options={optionloading} height={200} width={200} /> */}
            <img src={gift} alt="icon"/>
        </div>
    )
}
export const Success = () => {
    return(
        <div className="preLoader">
            <Lottie options={optionSuccess} height={100} width={100} /> 
        </div>
    )
}
export default Loading;