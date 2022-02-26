import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import FormEditc from "./components/FormCheckin";

function FouthStep(){
    const user = useSelector((state)=> state.serviceBooking.bookingConfirm.userInfo);
    const url = "Momo-booking-step-";
    const history = useHistory();
    function handleNextClick(){
        history.push(`${url+"5"}`);
    }
    function handleBackClick(){
        history.push(`${url+"3"}`);
    }
    return(
        <FormEditc
            UserInfor={user}
            handlePrev={handleBackClick}
            handleNext={handleNextClick}
        />
    );
}
export default FouthStep