import { useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slice/userSlice';
import img from "../assets/img.png"
import { NavLink } from 'react-router-dom';

// Yup schema for validation
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
  const [loginError, setLoginError] = useState(""); // State for login error

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login with Supabase
  async function signInWithEmail() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) {
        throw error; // Throw error if login fails
      }
      return true; // Success case
    } catch (e) {
      setLoginError("Invalid credentials. Please check your email and password !!!"); // Set login error message
      console.log(e);
      return false;
    }
  }

  // Handle form submission and Yup validation
  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      // Clear previous errors
      setErrors({});
      setLoginError(""); // Reset login error message

      // Validate the form inputs using Yup
      await signUpSchema.validate({ name, email, password }, { abortEarly: false });

      // Attempt to sign in with email and password
      const success = await signInWithEmail();
      
      if (success) {
        // Update Redux store with user information
        dispatch(updateUser({ name: name, email: email }));
        
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        
        // Redirect to home page on successful login
        navigate('/home');
      }
    } catch (validationError) {
      // Handle Yup validation errors
      if (validationError.name === 'ValidationError') {
        const validationErrors = {};
        validationError.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors); // Set validation errors in state
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-#F3F4F8">
      <div className="bg-white rounded-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-4xl font-extrabold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Welcome back! please enter your details</p>

        {/* Show login error if it exists */}
        {loginError && <h2 className="text-red-600 text-center mb-4">{loginError}</h2>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              placeholder="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              placeholder="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className='flex items-center justify-between mb-4'>
            <label className="flex items-center">
              <input type='checkbox' className="mr-2"/> Remember me for 30 days
            </label>
            <p className='text-violet-600 cursor-pointer'>Forget password?</p>
          </div>

          <button 
            type="submit" 
            className="bg-violet-600 hover:bg-pink-400 text-white font-bold py-3 rounded-lg w-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-600">Don't have an account?</p>
          <NavLink to="/signup" className="text-purple-600 underline ml-2 font-extrabold">Sign Up</NavLink>
        </div>
      </div>

      <img src={img} alt="Illustration" className="hidden md:block w-1/2 max-w-sm lg:max-w-md mt-8 md:mt-0 md:ml-8" />
    </div>
  );
}

export default Login;


// import { useState } from 'react';
// import { supabase } from '../client';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateUser } from '../slice/userSlice';

// // Yup schema for validation
// const signUpSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// function Login() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loginError, setLoginError] = useState(""); // State for login error

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Login with Supabase
//   async function signInWithEmail() {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
      
//       if (error) {
//         throw error; // Throw error if login fails
//       }
//       return true; // Success case
//     } catch (e) {
//       setLoginError("Invalid credentials. Please check your email and password !!!"); // Set login error message
//       console.log(e);
//       return false;
//     }
//   }

//   // Handle form submission and Yup validation
//   async function handleSubmit(event) {
//     event.preventDefault();
    
//     try {
//       // Clear previous errors
//       setErrors({});
//       setLoginError(""); // Reset login error message

//       // Validate the form inputs using Yup
//       await signUpSchema.validate({ name, email, password }, { abortEarly: false });

//       // Attempt to sign in with email and password
//       const success = await signInWithEmail();
      
//       if (success) {
//         // Update Redux store with user information
//         dispatch(updateUser({ name: name, email: email }));
        
//         // Clear form fields
//         setName("");
//         setEmail("");
//         setPassword("");
        
//         // Redirect to home page on successful login
//         navigate('/home');
//       }
//     } catch (validationError) {
//       // Handle Yup validation errors
//       if (validationError.name === 'ValidationError') {
//         const validationErrors = {};
//         validationError.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         setErrors(validationErrors); // Set validation errors in state
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200 p-6">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg transform transition-all duration-300 hover:scale-105">
//         <h2 className=" font-extrabold text-3xl md:text-4xl lg:text-5xl text-center text-black p-3">Welcome back</h2>
//         <p className='flex justify-center items-center p-4 text-gray-500'>Make sure you directed to the magicLink in your MailBox to login succssfully</p>

//         {/* Show invalid credentials error if any */}
//         {loginError && (
//           <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-lg text-center">
//             {loginError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//         <h2>Full-Name</h2>
//           <div className="mb-4">
//             <input 
//               placeholder="Full Name" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
//             />
//             {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>} {/* Display name validation error */}
//           </div>
//           <h2>Email</h2>
//           <div className="mb-4">
//             <input 
//               placeholder="Email" 
//               type="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
//             />
//             {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>} {/* Display email validation error */}
//           </div>
//           <h2>Password</h2>
//           <div className="mb-4">
//             <input 
//               placeholder="Password" 
//               type="password"
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
//             />
//             {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>} {/* Display password validation error */}
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-indigo-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 transition-all duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


