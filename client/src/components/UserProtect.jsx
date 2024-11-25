import React from "react";
import { Navigate } from "react-router-dom";

export const UserProtect = ({ isModified, children }) => {
  if (!isModified) {
    return <Navigate to="/subscription" replace />;
  }
  return children;
};
export const UserPlansProtect = ({ plansData, children }) => {
    if (!plansData) {
      return <Navigate to="/subscription" replace />;
    }
    return children;
  };

  export const SuccessProtect = ({ successAck, children }) => {
    if (!successAck) {
      return <Navigate to="/subscription" replace />;
    }
    return children;
  };




//   import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://your-api.com/login', { mobile: mobileNumber });
//       // Assuming the response contains a JWT token
//       localStorage.setItem('authToken', response.data.token); // Store token in localStorage
//       navigate('/protected'); // Redirect to protected route
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login with Mobile Number</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="text" 
//           value={mobileNumber} 
//           onChange={(e) => setMobileNumber(e.target.value)} 
//           placeholder="Enter mobile number" 
//           required 
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;



