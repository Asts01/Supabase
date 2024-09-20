import { useEffect, useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slice/userSlice';
import img from "../assets/img.png";
import FormInput from '../customComponents/FormInput';
import SocialSignUpButton from '../customComponents/SocialSignUpButton';
import FooterLink from '../customComponents/FooterLink';
import '../App.css'
import OnSignUp from '../hooks/OnSignUp';

// Yup schema for validation
const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authStatus = JSON.parse(localStorage.getItem('authStatus'));

  async function signUpNewUser() {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://google.com',
        },
      });

      if (error) {
        setSignUpError(error.message);
        return;
      }

      OnSignUp();
      dispatch(updateUser({ name: name, email: email }));
      setEmail("");
      setPassword("");
      setName("");
      // After a successful sign-up
      // localStorage.setItem('authStatus', JSON.stringify({ isAuthenticated: true }));
      // localStorage.setItem('details', JSON.stringify({ name, email }));

      navigate('/home');
    } catch (e) {
      setSignUpError(e.message);
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
