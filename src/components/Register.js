import React from "react";
import { fetchSignupUser } from "../services/authServices";
import { Link, Form, useActionData, redirect } from "react-router-dom";
import classes from "./Register.module.css";

function RegisterPage() {
  const data = useActionData();

  return (
    <div className={classes.register + " col-12"}>
      <img src="/images/banner1.jpg" alt="register banner" />
      <img src="/images/banner1.jpg" alt="register banner" />
      <div className={classes.form}>
        <Form method="post">
          <div className={classes.title}>Sign Up</div>

          <input type="text" required placeholder="Full Name" name="fullname" />
          <input type="text" required placeholder="Email" name="email" />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
          />
          <input type="text" required placeholder="Phone" name="phone" />
          <button>SIGN UP</button>
          {data && (
            <ul className={classes.error}>
              {Object.values(data).map((err, index) => (
                <li key={err + index}>{err}</li>
              ))}
            </ul>
          )}
          <p>
            Login?<Link to="/login"> Click</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;

export async function action({ request }) {
  const data = await request.formData();
  const enteredRegister = {
    fullname: data.get("fullname"),
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
  };
  const { fullname, email, password, phone } = enteredRegister;
  const errors = {};

  // validate form input
  if (fullname.trim() === "") {
    errors.fullname = "Vui lòng nhập tên đầy đủ!";
  }
  if (email.trim() === "") {
    errors.email = "Vui lòng nhập email!";
  } else if (email.includes("@") === false) {
    errors.email = "Email không chính xác, vui lòng nhập lại!";
  }
  // else if (emailExist.length) {
  //   errors.email = "Email đã được sử dụng, vui lòng sử dụng email khác!";
  // }
  if (password.trim() === "") {
    errors.password = "Vui lòng nhập mật khẩu!";
  } else if (password.trim().length < 8) {
    errors.password = "Mật khẩu phải từ 8 ký tự trở lên!";
  }
  if (phone.trim() === "") {
    errors.phone = "Vui lòng nhập số điện thoại!";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const response = await fetchSignupUser(enteredRegister);
  if (response?.status === 409) {
    errors.email = "Email đã được sử dụng, vui lòng sử dụng email khác!";
    return errors;
  }

  return redirect("/login");
}
