import { useEffect, useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../slice/userSlice';
import img from "../assets/img.png"
import { NavLink } from 'react-router-dom';
import FormInput from '../customComponents/FormInput';
import SocialSignUpButton from '../customComponents/SocialSignUpButton';
import FooterLink from '../customComponents/FooterLink';
import '../App.css'
import { setAuthStatusToTrue } from '../slice/userSlice';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatusRedux=useSelector((state)=>state.user.isAuthenticated);
  // console.log(authStatusRedux);
  // const authStatusRedux = JSON.parse(localStorage.getItem('authStatus'));
  

  //aage tabhi behjo user ko,if we have authStatus true and once loggedOut - it is set to false
  useEffect(()=>{
    if(authStatusRedux===true)
      {
        navigate('/home');
      }
  },[])

  async function signInWithEmail() {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      dispatch(setAuthStatusToTrue(true));//now user needs to remain logged-in unless refreshed
      return true;
    } catch (e) {
      setLoginError("Invalid credentials. Please check your email and password.");
      return false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setErrors({});
      setLoginError("");
      await signUpSchema.validate({ name, email, password }, { abortEarly: false });
      const success = await signInWithEmail();

      if (success) {
        dispatch(setAuthStatusToTrue(true));
        dispatch(updateUser({ name: name, email: email }));
        setName("");
        setEmail("");
        setPassword("");
        navigate('/home');
      }
    } catch (validationError) {
      if (validationError.name === 'ValidationError') {
        const validationErrors = {};
        validationError.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  }

  return (
    <div className="page-container flex-row">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Please enter your details</p>
        {loginError && <h2 className="form-error">{loginError}</h2>}

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
            type="email" 
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
          <button className="form-button" type="submit">Login</button>
        </form>

        <FooterLink
          message="Don't have an account?"
          linkText="Sign Up"
          linkTo="/signup"
        />
      </div>
      <div>
      <img src={img} alt="Illustration" className="page-image w-full h-full shadow-none" />
      </div>
    </div>
  );
}

export default Login;
