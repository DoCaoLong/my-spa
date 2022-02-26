import React from "react";
import { Dialog, Slide } from "@mui/material";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
import img from "../../../constants/imageList";

const Transition_up = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Transition_right = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function HomePopupBanner(props) {
  const { open, setOpen, data } = props;
  const checkType = (data) => {
    switch (data?.type) {
      case "VIDEO":
        return (
          <ReactPlayer
            controls
            width={"100%"}
            url={`${data?.url}`}
            //url='https://myspa.vn/files/video/World_Medical_Center.mp4'
          />
        );
      case "HTML":
        return (
          <>
            <div className="cus-header__org-branch-map">
              <button
                onClick={() => setOpen(false)}
                className="cus-header__back-btn"
              >
                <img src={img.chevronLeft} alt="" />
              </button>
            </div>
            <div className="popup-banner">{parse(`${data?.htmlTemplate}`)}</div>
          </>
        );
      default:
        break;
    }
  };
  return (
    <Dialog
      TransitionComponent={
        data?.type === "VIDEO" ? Transition_up : Transition_right
      }
      fullWidth={true}
      fullScreen={data?.type === "HTML" ? true : false}
      open={open}
      onClose={() => setOpen(false)}
    >
      {checkType(data)}
    </Dialog>
  );
}

export default HomePopupBanner;
