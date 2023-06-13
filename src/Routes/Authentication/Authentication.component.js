
import SignUpForm from "../../components/Sign-up-form/SignupForm.component";
import SignInForm from "../../components/Sign-in-form/SigninForm.component";
import "./Authentication.styles.scss"
const Authentication = () => {

  return (
    <div className="Authentication-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default Authentication;
