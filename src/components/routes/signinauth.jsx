import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocument,
  signInAuthUserWithEmailAndPassword,
} from "../../firebase/firebase";

import FormInput from "../form-inputs";
import Button from "../button";

import "../../css/signin.styles.scss";

const defaultformFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;

  const resetForm = () => {
    setFormFields(defaultformFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetForm();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("incorrect password");
      } else if (error.code === "auth/user-not-found") {
        alert("email does not exist");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account? Sign In</h2>
      <span>sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          minlength="8"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="">
            Sign In
          </Button>
          <Button onClick={signInWithGoogle} type="button" buttonType="google">
            Google signIn
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
