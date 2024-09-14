import { useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slice/userSlice';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg transform transition-all duration-300 hover:scale-105">
        <h2 className=" font-extrabold text-3xl md:text-4xl lg:text-5xl text-center text-indigo-500 p-3">Log-In</h2>
        <p className='flex justify-center items-center p-4 text-gray-500'>Make sure you directed to the magicLink in your MailBox</p>

        {/* Show invalid credentials error if any */}
        {loginError && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-lg text-center">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>} {/* Display name validation error */}
          </div>
          
          <div className="mb-4">
            <input 
              placeholder="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>} {/* Display email validation error */}
          </div>

          <div className="mb-4">
            <input 
              placeholder="Password" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>} {/* Display password validation error */}
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
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
//     <div className="flex flex-col items-center p-6">
//       <h2 className="underline font-extrabold text-3xl md:text-4xl lg:text-5xl mb-5">Login to your Account</h2>

//       {/* Show invalid credentials error if any */}
//       {loginError && (
//         <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-lg">
//           {loginError}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="bg-slate-300 rounded-lg p-6 w-full max-w-md">
//         <div className="mb-4">
//           <input 
//             placeholder="Full Name" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.name && <p className="text-red-500">{errors.name}</p>} {/* Display name validation error */}
//         </div>
        
//         <div className="mb-4">
//           <input 
//             placeholder="Email" 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.email && <p className="text-red-500">{errors.email}</p>} {/* Display email validation error */}
//         </div>

//         <div className="mb-4">
//           <input 
//             placeholder="Password" 
//             type="password"
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.password && <p className="text-red-500">{errors.password}</p>} {/* Display password validation error */}
//         </div>

//         <button 
//           type="submit" 
//           className="bg-slate-400 hover:bg-slate-500 text-white font-bold p-3 rounded-lg w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
