import React from "react";
import "../../assets/styles/components/Footer.scss";
import { FormInput } from "../FormInput/FormInput";

type InputName = "email" | "message";

export interface UserFormState {
  email: string;
  message: string;
}

export interface UserInputs {
  id: number;
  name: InputName;
  type: any;
  placeholder: string;
  label: string;
}
const Footer = () => {
  const [values, setValues] = React.useState<UserFormState>({
    email: "",
    message: "",
  });

  console.log(values);

  const inputs: UserInputs[] = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 2,
      name: "message",
      type: "textarea",
      placeholder: "Ecrivez nous un petit message...",
      label: "Message",
    },
  ];

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <footer>
      <div className="container footer-wrapper">
        <div className="footer-about">
          <h2>About us</h2>
          <p className="footer-about__desc">
            We are a small team of passionate developers who wanted to use our
            skills to create something that could be used to help others.
          </p>
          <p className="footer-about__desc">
            We have spent thousands of hours on this project, and we hope it can
            help others get involved in their community.
          </p>
          <div className="footer-about__copyright">
            <p>Copyright 2022. All rights reserved.</p>
            <p>Powered by React</p>
          </div>
        </div>
        <div className="footer-contact">
          <form className="contact-form" onSubmit={handlesubmit}>
            <h2>Contactez-nous</h2>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="contact-btn">
              <button className="contact-btn__submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
