import { useState } from "react";

let namePattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
  // phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  // eslint-disable-next-line no-useless-escape
  phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  emailPattern =
    // eslint-disable-next-line no-useless-escape
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;

export default function useFormValidate(initialForm, validate) {
  let [form, setForm] = useState(initialForm);
  let [error, setError] = useState({});
  function inputChange(e) {
    // //console.log(e);
    let name = e.name;
    // let value = e.value.replace(/\D/g,'');
    let value = e.value ? e.value : "";
    // //console.log(value);
    setForm({
      ...form,
      [name]: value,
    });
  }

  function check() {
    let errObj = {};
    let { rule, message } = validate;
    if (!message) {
      message = {};
    }

    for (let i in rule) {
      let r = rule[i];
      let m = message[i] || {};
      // //console.log(form[i]);
      if (r.required && !form[i]?.trim()) {
        errObj[i] = m?.required || ["Trường này không được bỏ trống"];
        continue;
      }
      if (r.pattern && form[i]) {
        let { pattern } = r;
        // replace(/ +/g, " ");
        if (pattern === "name") pattern = namePattern;
        if (pattern === "email") pattern = emailPattern;
        if (pattern === "phone") pattern = phonePattern;
        if (!pattern?.test(form[i])) {
          errObj[i] = m?.pattern || [
            "Số điện thoại của bạn không đúng định dạng",
            "(123) 456-7890",
            "(123)456-7890",
            "123-456-7890",
            "1234567890",
          ];
        }
      }
      if (r.min) {
        if (form[i].length < r.min) {
          errObj[i] = m?.min || [`Trường này không được bé hơn ${r.min} ký tự`];
        }
      }
      if (r.max) {
        if (form[i].length > r.max) {
          errObj[i] = m?.max || [
            `Trường này không được lớn hơn ${r.max} ký tự`,
          ];
        }
      }
    }

    setError(errObj);
    return errObj;
  }
  return { form, error, inputChange, check };
}
