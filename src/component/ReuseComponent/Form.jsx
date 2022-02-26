/* eslint-disable eqeqeq */
import React, { useState } from "react";
// import Header from "./PurpleTitleSection";
import Input from "./Input";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { editAcc } from "../../redux/accountSlice";
import useFormValidate from "./ValidateForm";

FormEdit.propTypes = {
  UserInfor: PropTypes.any,
};
FormEdit.defaultProps = {
  UserInfor: {},
};
function FormEdit({ UserInfor, setOpenForm, handleSaveForm, ...Iother }) {
  const dispatch = useDispatch();
  // //console.log(UserInfor);
  const [oldName] = useState((UserInfor)?UserInfor.fullname:'');
  const [oldNumber] = useState((UserInfor)?UserInfor.telephone:'');
  const [oldEmail] = useState((UserInfor)?UserInfor.email:'');
  function handleSaveClick(e) {
    e.preventDefault();
    // //console.log({
    //   oldName,
    //   oldNumber,
    //   oldEmail,
    // });
    let errObj = check();
    // //console.log(`erObj`, errObj);

    if (Object.keys(errObj).length === 0) {
      // //console.log("form", form);
      const action = editAcc({
        fullname: form.name,
        telephone: form.phone,
        email: form.email,
      });
      dispatch(action);
      setOpenForm(false);
    }
  }

  let { inputChange, check, error, form } = useFormValidate(
    {
      name: oldName,
      phone: oldNumber,
      email: oldEmail,
    },
    {
      rule: {
        name: {
          required: true,
          pattern: "name",
          min: 2,
          max: 32,
        },
        phone: {
          required: true,
          min: 9,
          max: 15,
          pattern: "phone",
        },
        email: {
          required: true,
          pattern: "email",
        },
      },
    }
  );

  return (
    <div className="page-checkin">
      <div className="wraper-checkin">
        <div className="form-wrap">
          <form className="form-checkin" action="">
            <Input
              labelFor="name"
              labelText="Họ và tên"
              InputId="name"
              name="name"
              placeholder="Nhập tên của bạn"
              value={form.name}
              setValue={inputChange}
              required
            />
            {error.name && (
              <p className="nunito-text-md" style={{ color: "red" }}>
                {error.name}
              </p>
            )}

            <Input
              labelFor="phone"
              labelText="Số điện thoại"
              InputId="phone"
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
              value={form.phone}
              setValue={inputChange}
              required
            />
            {error.phone && (
              <p className="nunito-text-md" style={{ color: "red" }}>
                <ul>
                  {error.phone.map((item, key) => (
                    <li key={key}>
                      {key >= 1 && "- "}
                      {item}
                      {key === 0 && ":"}
                    </li>
                  ))}
                </ul>
              </p>
            )}

            <Input
              labelFor="email"
              labelText="Email"
              InputId="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={form.email}
              setValue={inputChange}
              required
            />
            {error.email && (
              <p
                className="nunito-text-md"
                style={{ color: "red", padding: "4px 0 10px 0" }}
              >
                {error.email}
              </p>
            )}

            <div
              className="btn-allow nunito-text-mmd text-white-color bg-purple-color"
              onClick={handleSaveClick}
            >
              Lưu thay đổi
            </div>
            {/* <div className="confirm-btn ">
                                <div className="btn-skip nunito-text-mmd text-primary-color bg-white" onClick={handleBackClick} >Quay lại</div>
                                
                            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormEdit;
