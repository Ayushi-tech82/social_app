// import { useEffect, useState } from "react";
// import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
// import { Auth } from "../components/auth";
// import { db, auth } from "../config/firebase";
// import { useRouter } from 'next/router';
// // import {login} from "./login";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   doc,
// } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { toast } from "react-toastify";

// function App(): JSX.Element {
//   const router = useRouter()
//   const [users, setUsers] = useState<any[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [address, setAddress] = useState("");
//   const [mobileNo, setMobileNo] = useState<number>(0);

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const usersCollectionRef = collection(db, "users");

//   const getUsers = async (): Promise<void> => {
//     try {
//       const data = await getDocs(usersCollectionRef);
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setUsers(filteredData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const onSubmitSignup = async (): Promise<void> => {
//     try {
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);

//       await addDoc(usersCollectionRef, {
//         name: name,
//         email: email,
//         password: password,
//         dateOfBirth: dateOfBirth,
//         address: address,
//         mobileNo: mobileNo,
//         userId: user?.uid,
//       });

//       getUsers();
//       router.push('/login')
//     } 

//     catch (err) {
//       console.error(err);
//     }
//   };


//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError("Invalid email address");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const validatePassword = () => {
//     if (password.length < 6) {
//       setPasswordError("Password should have at least 6 characters");
//     } else {
//       setPasswordError("");
//     }
//   };

//   return (
//     <div className="App">
//       <Auth />
// {/* <login/> */}
//       <div>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Enter your name"
//             required
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             required
//             value={email}
//             onChange={handleEmailChange}
//             onBlur={validateEmail}
//           />
//           {emailError && <span className="error">{emailError}</span>}
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             id="password"
//             type="password"
//             required
//             placeholder="Enter your password"
//             onChange={handlePasswordChange}
//             onBlur={validatePassword}
//           />
//           {passwordError && <span className="error">{passwordError}</span>}
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             id="confirmPassword"
//             type="password"
//             required
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="dateOfBirth">Date of Birth:</label>
//           <input
//             id="dateOfBirth"
//             type="date"
//             required
//             placeholder="Date of Birth"
//             onChange={(e) => setDateOfBirth(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="address">Address:</label>
//           <input
//             id="address"
//             required
//             placeholder="Address"
//             onChange={(e) => setAddress(e.target.value)}
//           />
//            </div>
//         <div>
//           <label htmlFor="mobileNo">Mobile No:</label>
//           <input
//             id="mobileNo"
//             type="tel"
//             required
//             placeholder="Mobile No"
//             onChange={(e) => setMobileNo(parseInt(e.target.value))}
//           />
//         </div>
//         <button onClick={onSubmitSignup}>Sign Up</button>
//       </div>
//     </div>
//   );
// }

// export default App;






{/* / import { useEffect, useState } from "react";
// import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
// import { Auth } from "../components/auth";
// import { db, auth } from "../config/firebase";
// import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function App(): JSX.Element {/ */}
{/* //   const [users, setUsers] = useState<any[]>([]);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [address, setAddress] = useState("");
//   const [mobileNo, setMobileNo] = useState<number>(0);

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const usersCollectionRef = collection(db, "users");

//   const getUsers = async (): Promise<void> => { */}
{/* //     try { */}
{/* //       const data = await getDocs(usersCollectionRef);
//       const filteredData = data.docs.map((doc) => ({ */}
{/* //         ...doc.data(),
//         id: doc.id,
//       }));
//       setUsers(filteredData);
//     } catch (err) { */}
{/* //       console.error(err);
//     }
//   };

//   useEffect(() => { */}
{/* //     getUsers();
//   }, []);

//   const onSubmitSignup = async (): Promise<void> => { */}
{/* //     try { */}
{/* //       await addDoc(usersCollectionRef, { */}
{/* //         name: name,
//         email: email,
//         password: password,
//         dateOfBirth:dateOfBirth,
//         address: address,
//         mobileNo: mobileNo,
//         userId: auth?.currentUser?.uid,
//       });
//       getUsers();
//     } catch (err) { */}
{/* //       console.error(err);
//     }
//   };

//   const deleteSignup = async (id: string): Promise<void> => {
//     const userDoc = doc(db, "users", id); */}
{/* //     await deleteDoc(userDoc);
//     getUsers();
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { */}
{/* //     setEmail(e.target.value);
//   };

//   const validateEmail = () => { */}
{/* //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) { */}
{/* //       setEmailError("Invalid email address");
//     } else { */}
{/* //       setEmailError("");
//     }
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { */}
{/* //     setPassword(e.target.value);
//   };

//   const validatePassword = () => {
//     if (password.length < 6) { */}
{/* //       setPasswordError("Password should have at least 6 characters");
//     } else { */}
{/* //       setPasswordError("");
//     }
//   };

//   return (
//     <div className="App">
//       <Auth />

//       <div>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input */}
{/* //             id="name"
//             type="text"
//             placeholder="Enter your name"
//             required
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div> */}
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             required
//             value={email}
//             onChange={handleEmailChange}
//             onBlur={validateEmail}
//           />
//           {emailError && <span className="error">{emailError}</span>}
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             id="password"
//             type="password"
//             required
//             placeholder="Enter your password"
//             onChange={handlePasswordChange}
//             onBlur={validatePassword}
//           />
//           {passwordError && <span className="error">{passwordError}</span>}
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             id="confirmPassword"
//             type="password"
//             required
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <div>
//   <label htmlFor="dateOfBirth">Date of Birth:</label>
//   <input
//     id="dateOfBirth"
//     type="date"
//     required
//     placeholder="Date of Birth"
//     onChange={(e) => setDateOfBirth(e.target.value)}
//   />
// </div>
//         <div>
//           <label htmlFor="address">Address:</label>
//           <input
//             id="address"
//             required
//             placeholder="Address"
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="mobileNo">Mobile Number:</label>
//           <input
//             id="mobileNo"
//             type="tel"
//             pattern="[0-9]{10}"
//             required
//             placeholder="Mobile Number"
//             onChange={(e) => setMobileNo(Number(e.target.value))}
//           />
//         </div>
//         <button onClick={onSubmitSignup}>Sign Up</button>
//       </div>
//       <div>
//     {/* {movieList.map((movie) => (
//       <div key={movie.id}>
//         <h1>{movie.address}</h1>
//         <p> Release Date: {movie.releaseDate} </p>
//         <p> Date of Birth: {movie.dateOfBirth} </p>

//         <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

//         <input
//           placeholder="new address..."
//           onChange={(e) => setUpdatedAddress(e.target.value)}
//         />
//         <input
//           placeholder="new release date..."
//           type="number"
//           onChange={(e) => setUpdatedReleaseDate(Number(e.target.value))}
//         />
//         <input
//           placeholder="new date of birth..."
//           onChange={(e) => setUpdatedDateOfBirth(e.target.value)}
//         />
//         <button onClick={() => updateMovieTitle(movie.id)}>
//           {" "}
//           Update Details
//         </button>
//       </div>
//     ))} */}
//   </div>

//   {/* <div>
//     <input type="file" onChange={(e) => setFileUpload(e.target.files?.[0])} />
//     <button onClick={uploadFile}> Upload File </button>
//   </div> */}
// </div>
// );
// }

// export default App;

// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Navbar from '../components/Navbar'
// import {AuthContextProvider} from '../context/AuthContext'

import { AuthContextProvider } from "@/context/AuthContext";
import SignUp from "../pages/signup";
import './App.css';
import Login from "../pages/login";
import Card from "../pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Card />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
// export default App