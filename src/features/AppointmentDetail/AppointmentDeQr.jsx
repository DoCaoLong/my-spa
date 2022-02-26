import React from 'react';
import { Dialog } from '@mui/material';
import QRCode from "react-qr-code";

function AppointmentDeQr(props) {
      const {openQr, setOpenQr} = props;
      //const [openQr, setOpenQr] = useState(true)
      return (
            <Dialog
                  open={openQr}
                  onClose={() => setOpenQr(false)}
            >
                  <div className="app-de-qr">
                        <div className="app-de-qr__title">
                              Quét mã để checkin thông tin
                        </div>
                        <div className="app-de-qr__cnt">
                              <QRCode
                                    value='https://myspa.vn/'
                                    fgColor='#7161BA'
                              />
                        </div>
                  </div>
            </Dialog>
      );
}

export default AppointmentDeQr;