import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Form from "../../../component/ReuseComponent/Form";
import Header from '../../Header/index'

EditForm.propTypes = {
	openForm: PropTypes.bool,
	setOpenForm: PropTypes.func,
	UserInfor: PropTypes.any
};
EditForm.defaultProps = {
	openForm: PropTypes.bool,
	setOpenForm: PropTypes.func,
	UserInfor: PropTypes.any
};
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function EditForm(props) {
      const headerTitle="Thông tin người dùng"
      const { openForm,
            setOpenForm,
            UserInfor
        } = props;
      return (
            <Dialog
                  fullScreen
                  open={openForm}
                  TransitionComponent={Transition}
            >
                  <Header
                        headerTitle={headerTitle}
                        setOpenForm={setOpenForm}
                  />
                  <Form
                        // oldValue = {DefaultInfor}
                        UserInfor={UserInfor} 
                        setOpenForm={setOpenForm}
                  />
            </Dialog>
      );
}

export default EditForm;