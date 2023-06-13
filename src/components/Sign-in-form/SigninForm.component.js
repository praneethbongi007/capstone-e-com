import { useState } from "react";
import {
  SignwithGooglepopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../Utils/Firebase/Firebase.Utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./SigninForm.styles.scss";
const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("no user associated  with email ");
          break;
          default:
            console.log(error)
      }
    }
  };

  const SignInWithGoogle = async () => {
    const { user } = await SignwithGooglepopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttoncontainer">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
