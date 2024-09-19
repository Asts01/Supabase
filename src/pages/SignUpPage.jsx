import { useEffect, useState } from 'react';
import { supabase } from '../client';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slice/userSlice';
import img from "../assets/img.png"

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

      if (error) {
        setSignUpError(error.message);
        return;
      }

      dispatch(updateUser({ name: name, email: email }));
      setEmail("");
      setPassword("");
      setName("");
      navigate('/home');
    } catch (e) {
      console.log(e);
      setSignUpError(e.message);
    }
  }

  // Handle form submission and Yup validation
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-#F3F4F8">
      <div className="bg-white rounded-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-4xl font-extrabold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Welcome back! please enter your details</p>

        {/* Show sign-up error if it exists */}
        {signUpError && <h2 className="text-red-600 text-center mb-4">{signUpError}</h2>}

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
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
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
            Sign Up
          </button>

          <div className='flex items-center mt-4'>
            <button 
              type="button" 
              className="bg-white hover:bg-pink-400 text-black py-3 rounded-lg w-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-300 flex items-center justify-center"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google logo" 
                className="w-5 h-5 mr-2" 
              />
              Sign up with Google
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-600">Already have an account?</p>
          <NavLink to="/login" className="text-purple-600 underline ml-2 font-extrabold">Login</NavLink>
        </div>
      </div>
      
      <img src={img} alt="Illustration" className="hidden md:block w-1/2 max-w-sm lg:max-w-md mt-8 md:mt-0 md:ml-8" />
    </div>
  );
}

export default SignUp;

// import { useEffect, useState } from 'react';
// import { supabase } from '../client';
// import * as Yup from 'yup';
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateUser } from '../slice/userSlice';
// import img from "../assets/img.png"

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
//   const [signUpError, setSignUpError] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Sign-up with Supabase
//   async function signUpNewUser() {
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: email,
//         password: password,
//         options: {
//           emailRedirectTo: 'https://google.com', // Redirect to homepage or confirmation page
//         },
//       });

//       if (error) {
//         // Set the error message to display it on the UI
//         setSignUpError(error.message);
//         return;
//       }

//       //on successful sign-up, update the user in Redux
//       dispatch(updateUser({ name: name, email: email }));

//       // Clear the form fields
//       setEmail("");
//       setPassword("");
//       setName("");

//       // Navigate to home page
//       navigate('/home');
//     } catch (e) {
//       // Log any unexpected errors and set sign-up error message
//       console.log(e);
//       setSignUpError(e.message);
//     }
//   }

//   // Handle form submission and Yup validation
//   function handleSubmit(event) {
//     event.preventDefault();

//     signUpSchema.validate({ name, email, password }, { abortEarly: false })
//       .then(() => {
//         setErrors({}); // Clear previous validation errors
//         signUpNewUser(); // Attempt to sign up
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
//     <div>
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-4xl font-extrabold text-center mb-2">Welcome Back</h2>
//         <p className="text-gray-600 text-center mb-6">Welcome back! please enter youir details</p>

//         {/* Show sign-up error if it exists */}
//         {signUpError && <h2 className="text-red-600 text-center mb-4">{signUpError}</h2>}

//         <form onSubmit={handleSubmit}>
//           <h1>Full Name</h1>
//           <div className="mb-6">
//             <input 
//               placeholder="Full Name" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>
//           <h1>Email</h1>
//           <div className="mb-6">
//             <input 
//               placeholder="Email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>
//           <h1>Password</h1>
//           <div className="mb-6">
//             <input 
//               placeholder="Password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               type="password" 
//               className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>
//           <div className='flex items-center justify-between mb-2'>
//             <label className="flex items-center">
//               <input type='checkbox' className="mr-2"/> Remember me for 30 days
//             </label>
//             <p className='text-violet-600 cursor-pointer'>Forget password</p>
//           </div>

//           <button 
//             type="submit" 
//             className="bg-violet-600 hover:bg-pink-400 text-white font-bold py-3 rounded-lg w-full transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             Sign Up
//           </button>
//           <div className='flex items-center'>
//           <button 
//             type="submit" 
//             className="bg-white hover:bg-pink-400 text-black py-3 rounded-lg w-full transition-all duration-300 shadow-lg hover:shadow-xl mt-3 border-gray-700 flex items-center justify-center"
//           >
//             <img 
//               src="https://icon2.cleanpng.com/20201008/xyt/transparent-google-suite-icon-google-icon-1713858255833.webp"
//               alt="Google logo" 
//               className="w-5 h-5 mr-2" 
//             />
//             Sign up with Google
//           </button>
//         </div>

//         </form>

//         <div className="mt-6 flex justify-center items-center">
//           <p className="text-gray-600">Already have an account?</p>
//           <NavLink to="/login" className="text-purple-600 underline ml-2 font-extrabold">Login</NavLink>
//         </div>
//       </div>
//       <img src={img}/>
//     </div>
//     </div>
//   );
// }

// export default SignUp;



