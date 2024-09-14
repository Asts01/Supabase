import { useEffect, useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slice/userSlice';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sign-up with Supabase
  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://google.com', // Redirect to homepage or confirmation page
        },
      });
      if (error) throw error;
      dispatch(updateUser({ name: name, email: email }));
      setEmail("");
      setPassword("");
      setName("");
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  }

  // Handle form submission and Yup validation
  function handleSubmit(event) {
    event.preventDefault();

    signUpSchema.validate({ name, email, password }, { abortEarly: false })
      .then(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-2 text-purple-500">Create an Account</h2>
        <p className="text-gray-600 text-center mb-6">(Check your email to verify your account & login later)</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <input 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <input 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button 
            type="submit" 
            className="bg-purple-400 hover:bg-pink-400 text-white font-bold py-4 rounded-lg w-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-600">Already have an account?</p>
          <NavLink to="/login" className="text-p-600 underline ml-2 font-extrabold">Login</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


// import { useEffect, useState } from 'react';
// import { supabase } from '../client';
// import * as Yup from 'yup';
// import { NavLink,Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../slice/userSlice';

// // Yup schema for validation
// const signUpSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
// //   // Sign-up with Supabase
//   async function signUpNewUser() {
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: email,
//         password: password,
//         options: {
//           emailRedirectTo: 'https://google.com',  // Redirect to homepage or confirmation page
//         },
//       });
//       if (error) throw error;
//       dispatch(updateUser({name:name,email:email}));
//       setEmail("");setPassword("");setName("");
//       navigate('/home');
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   // Handle form submission and Yup validation
//   function handleSubmit(event) {
//     event.preventDefault();
    
//     signUpSchema.validate({ name, email, password }, { abortEarly: false })
//       .then(() => {
//         signUpNewUser();
//       })
//       .catch((err) => {
//         const validationErrors = {};
//         err.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         setErrors(validationErrors);
//       });
//   }
//   return (
//     <div className="flex flex-col items-center p-6 bg-slate-300 m-20 rounded-2xl">
//       <h2 className="text-3xl font-extrabold text-center mb-2">Welcome back</h2>
//       <p className="text-slate-500 text-center mb-4">
//         Welcome back! Please enter your details.
//       </p>
      
//       <div className="bg-white shadow-md rounded-3xl p-6 w-full max-w-md">
//         <div className="mb-4">
//           <p className='p-'>Email</p>
//           <input
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 rounded-lg border border-gray-300"
//           />
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </div>

//         <div className="mb-4">
//           <input
//             type="password"
//             placeholder="Enter your Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 rounded-lg border border-gray-300"
//           />
//           {errors.password && <p className="text-red-500">{errors.password}</p>}
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <label className="flex items-center space-x-2">
//             <input type="checkbox" />
//             <span>Remember for 30 days</span>
//           </label>
//           <Link to="/forgot-password" className="text-blue-500">
//             Forgot password?
//           </Link>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg w-full mb-4"
//         >
//           Sign in
//         </button>

//         <button className="border border-gray-300 hover:bg-gray-100 py-3 rounded-lg w-full flex items-center justify-center space-x-2">
//           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
//           <span>Sign in with Google</span>
//         </button>
//       </div>

//       <p className="mt-4 text-slate-500">Already have an account?</p>
//       <NavLink to="/Login">
//          <button className="text-blue-500 underline">Login</button>
//       </NavLink>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { supabase } from '../client';
// import * as Yup from 'yup';
// import { NavLink,Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../slice/userSlice';

// // Yup schema for validation
// const signUpSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const navigate=useNavigate();
//   const dispatch = useDispatch();

//   // Sign-up with Supabase
//   async function signUpNewUser() {
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: email,
//         password: password,
//         options: {
//           emailRedirectTo: 'https://google.com',  // Redirect to homepage or confirmation page
//         },
//       });
//       if (error) throw error;
//       dispatch(updateUser({name:name,email:email}));
//       setEmail("");setPassword("");setName("");
//       navigate('/home');
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   // Handle form submission and Yup validation
//   function handleSubmit(event) {
//     event.preventDefault();
    
//     signUpSchema.validate({ name, email, password }, { abortEarly: false })
//       .then(() => {
//         signUpNewUser();
//       })
//       .catch((err) => {
//         const validationErrors = {};
//         err.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         setErrors(validationErrors);
//       });
//   }

//   return (
//     <div className="flex flex-col items-center p-6">
//       <h2 className="underline font-extrabold text-3xl md:text-4xl lg:text-5xl">Create An Account</h2>
//       <h4 className="text-slate-500 mb-4">(Check your email to verify your account)</h4>
      
//       <div className="bg-slate-300 rounded-lg p-6 w-full max-w-md">
//         <div className="mb-4">
//           <input 
//             placeholder="Full Name" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.name && <p className="text-red-500">{errors.name}</p>}
//         </div>
        
//         <div className="mb-4">
//           <input 
//             placeholder="Email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </div>

//         <div className="mb-6">
//           <input 
//             placeholder="Password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             type="password" 
//             className="w-full p-2 rounded-lg border"
//           />
//           {errors.password && <p className="text-red-500">{errors.password}</p>}
//         </div>

//         <button 
//           onClick={handleSubmit} 
//           className="bg-slate-400 hover:bg-slate-500 text-white font-bold p-3 rounded-lg w-full"
//         >
//           SignUp
//         </button>
//       </div>
      
//       <p className="mt-4">Already have an account?</p>
//       <NavLink to="/Login">
//         <button className="text-blue-500 underline">Login</button>
//       </NavLink>
//     </div>
//   );
// }

// export default SignUp;
