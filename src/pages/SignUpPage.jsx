
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { updateUser } from '../slice/userSlice';
import img from "../assets/img.png";
import FormInput from '../customComponents/FormInput';
import SocialSignUpButton from '../customComponents/SocialSignUpButton';
import FooterLink from '../customComponents/FooterLink';
import '../App.css';
import { setAuthStatusToTrue } from '../slice/userSlice';
import OnSignUp from '../hooks/OnSignUp';

// Yup schema for validation
const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function SignUp() {
  let authStatusRedux=useSelector((state)=>state.user.isAuthenticated);
  useEffect(()=>{
    if(authStatusRedux===true)
      {
        navigate('/home');
        OnSignUp();
      }
  },[authStatusRedux])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      
      if (error) {
        setSignUpError(error.message);  
        return;
      }

      if (data && data.user) {
        // Only proceed if the user has been successfully authenticated
        if (data.user.aud === 'authenticated') {
          // Dispatch user data to Redux store
          dispatch(updateUser({ name: name, email: email }));
          console.log("fussss");
          dispatch(setAuthStatusToTrue(true));
          OnSignUp();
          // Navigate to home page
        } else {
          setSignUpError("Sign-up failed: Unable to authenticate user.");
        }
      }
      
    } catch (e) {
      console.log(e);
      setSignUpError(e.message || "Something went wrong during sign-up.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    signUpSchema.validate({ name, email, password }, { abortEarly: false })
      .then(() => {
        setErrors({});
        signUpNewUser();  
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  }

  return (
    <div className="page-container flex-row">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Please enter your details</p>
        {signUpError && <h2 className="form-error">{signUpError}</h2>}

        <form onSubmit={handleSubmit}>
          <FormInput 
            label="Full Name" 
            placeholder="Full Name" 
            value={name} 
            setValue={setName} 
            error={errors.name}
          />
          <FormInput 
            label="Email" 
            placeholder="Email" 
            value={email} 
            setValue={setEmail} 
            error={errors.email}
          />
          <FormInput 
            label="Password" 
            placeholder="Password" 
            type="password" 
            value={password} 
            setValue={setPassword} 
            error={errors.password}
          />
          <div className='form-footer'>
            <label className="form-checkbox-label">
              <input type='checkbox' /> Remember me for 30 days
            </label>
            <p className='form-link'>Forgot password?</p>
          </div>
          <button className="form-button" type="submit">Sign Up</button>
          <SocialSignUpButton />
        </form>

        <FooterLink
          message="Already have an account?"
          linkText="Login"
          linkTo="/login"
        />
      </div>
      <img src={img} alt="Illustration" className="page-image w-full h-full shadow-none" />
    </div>
  );
}

export default SignUp;