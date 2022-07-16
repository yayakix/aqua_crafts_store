
import SignupForm from './signup';
import SignInForm from './signinauth';

import '../../css/signinuppage.scss'

const Signin = () => {

  return (
    <div className="authentication-container">
    <SignInForm/>
      {/* <button onClick={logGoogleUser}>Sign in with google</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button> */}
<SignupForm/>
    </div>
  );
}


export default Signin;
