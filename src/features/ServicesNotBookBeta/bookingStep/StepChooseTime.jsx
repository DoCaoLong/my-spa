import React from 'react';
import { Dialog, Slide } from '@mui/material';
import ThirdStep from '../../BookingStep/ThirdStep';
import StepCheckin from './StepCheckin';
import { useState } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function StepChooseTime(props) {
      const { open, setOpen, is_dialog } = props;
      const [openNext, setOpenNext] = useState(false);
      ////console.log(openNext);
      return (
            <Dialog
                  fullScreen
                  open={open}
                  TransitionComponent={Transition}
            >
                  <ThirdStep
                        setOpen={setOpen}
                        is_dialog={is_dialog}
                        setOpenNext={setOpenNext}
                  />
                  <StepCheckin
                        openCheckin={openNext}
                        setOpenCheckin={setOpenNext}
                  />
            </Dialog>
      );
}

export default StepChooseTime;