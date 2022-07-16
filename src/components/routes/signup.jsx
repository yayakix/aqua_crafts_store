import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
} from "../../firebase/firebase";
// import { UserContext } from "../../context/usercontex";
import FormInput from "../form-inputs";
import Button from "../button";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { displayName, email, password, confirmPassword } = formFields;


  const resetForm = () => {
    setFormFields(defaultformFields)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocument(user, { displayName });
      resetForm()
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('this email is already in use');
      }else{
              console.log("user creation error: " + error);

      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
    <h2>Dont have an account? Sign Up</h2>
      <span>sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirmed Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit" buttonType=''>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignupForm;
