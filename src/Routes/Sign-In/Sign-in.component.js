import {
  SignwithGooglepopup,
  createUserDocumentFromAuth,
} from "../../Utils/Firebase/Firebase.Utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await SignwithGooglepopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>This is sign in </h1>
      <button onClick={logGoogleUser}>SignIn</button>
    </div>
  );
};

export default SignIn;
