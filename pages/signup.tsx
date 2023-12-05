'use client'

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Auth } from "../components/auth";
import { db, auth } from "../config/firebase";

function SignUp(): JSX.Element {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState<number>(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const usersCollectionRef = collection(db, "users");

  const getUsers = async (): Promise<void> => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmitSignup = async (): Promise<void> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await addDoc(usersCollectionRef, {
        name: name,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        address: address,
        mobileNo: mobileNo,
        userId: user?.uid,
        imageUrl: imageUrl,
      });

      getUsers();

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async (file: File): Promise<void> => {
    const storageRef = ref(getStorage(), "path/to/image.jpg");
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div data-testid="sign-up-form" className="register-container">
      <div className="form-container">
        <h1 className="register">Register Here!</h1>
        <div>
          <div className="input-field">
            <label className="input-label" htmlFor="name">
              Name:
            </label>
            <input
              className="input-area"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="image">
              Image:
            </label>
            <input
              className="input-area"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="email">
              Email:
            </label>
            <input
              className="input-area"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            {/* {emailError && <span={error}>{emailError}</span>} */}
          </div>
          <div>
            <label className="input-label" htmlFor="password">
              Password:
            </label>
      
            <input
              className="input-area"
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              onChange={handlePasswordChange}
            />
            {passwordError && <span>{passwordError}</span>}
          </div>
          <div>
            <label className="input-label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="input-area"
              id="confirmPassword"
              type="password"
              required
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="dateOfBirth">
              Date of Birth:
            </label>
            <input
              className="input-area"
              id="dateOfBirth"
              type="date"
              required
              placeholder="Date of Birth"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="address">
              Address:
            </label>
            <input
              className="input-area"
              id="address"
              required
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="mobileNo">
              Mobile No:
            </label>
            <input
              className="input-area"
              id="mobileNo"
              type="tel"
              required
              placeholder="Mobile No"
              onChange={(e) => setMobileNo(parseInt(e.target.value))}
            />
          </div>
          <div className="btn-container">
            <button onClick={onSubmitSignup} className="register-btn">
              Sign Up
            </button>
          </div>
          <div className="p">
            <p>Already have an account?</p>
            <p className="loginClick" onClick={handleLogin}>
              Login Here!
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;



// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const { signup } = useAuth();
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     dateOfBirth: "",
//     mobileNumber: "",
//     address: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const postData = { ...data }; // Create a copy of the data object

//       await signup(
//         postData.email,
//         postData.password,
//         postData.name,
//         postData.password,
//         postData.dateOfBirth,
//         postData.mobileNumber,
//         postData.address
//       );

//       const res = await fetch(
//         "https://your-firebase-database-url/DataRecord.json",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(postData), // Use postData instead of data
//         }
//       );

//       if (res.ok) {
//         toast.success("Signup and data stored successfully!");
//         setData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           dateOfBirth: "",
//           mobileNumber: "",
//           address: "",
//         });
//       } else {
//         toast.error("Data storage failed. Please try again.");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Signup and data storage failed!");
//     }
//   };

//   return (
//     <div style={{ width: "40%", margin: "auto" }}>
//       <h1 className="text-center my-3">Signup</h1>
//       <Form onSubmit={handleSignup}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="name"
//             name="name"
//             placeholder="Enter name"
//             required
//             onChange={handleInputChange}
//             value={data.name}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             required
//             onChange={handleInputChange}
//             value={data.email}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             onChange={handleInputChange}
//             value={data.password}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             required
//             onChange={handleInputChange}
//             value={data.confirmPassword}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
//           <Form.Label>Date of Birth</Form.Label>
//           <Form.Control
//             type="date"
//             name="dateOfBirth"
//             placeholder="Date of Birth"
//             required
//             onChange={handleInputChange}
//             value={data.dateOfBirth}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicMobileNumber">
//           <Form.Label>Mobile Number</Form.Label>
//           <Form.Control
//             type="tel"
//             name="mobileNumber"
//             placeholder="Mobile Number"
//             onChange={handleInputChange}
//             value={data.mobileNumber}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicAddress">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="address"
//             placeholder="Address"
//             onChange={handleInputChange}
//             value={data.address}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Signup
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Signup;


// // import React, { useState } from "react";
// // import { Button, Form } from "react-bootstrap";
// // import { useAuth } from "../context/AuthContext";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const Signup = () => {
// //   const { signup } = useAuth();
// //   const [data, setData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     dateOfBirth: "",
// //     mobileNumber: "",
// //     address: "",
// //   });

// //   const postdata = (
// //     field: string,
// //     value: string,
// //     setData: React.Dispatch<React.SetStateAction<any>>
// //   ) => {
// //     setData((prevData: any) => ({
// //       ...prevData,
// //       [field]: value,
// //     }));
// //   };

// //   const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     try {
// //       await signup(
// //         data.email,
// //         data.password,
// //         data.name,
// //         data.password,
// //         data.dateOfBirth,
// //         data.mobileNumber,
// //         data.address
// //       );

// //       const res = await fetch(
// //         "https://your-firebase-database-url/DataRecord.json",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(data),
// //         }
// //       );

// //       if (res.ok) {
// //         toast.success("Signup and data stored successfully!");
// //         setData({
// //           name: "",
// //           email: "",
// //           password: "",
// //           confirmPassword: "",
// //           dateOfBirth: "",
// //           mobileNumber: "",
// //           address: "",
// //         });
// //       } else {
// //         toast.error("Data storage failed. Please try again.");
// //       }
// //     } catch (err) {
// //       console.log(err);
// //       toast.error("Signup and data storage failed!");
// //     }
// //   };

// //   return (
// //     <div style={{ width: "40%", margin: "auto" }}>
// //       <h1 className="text-center my-3">Signup</h1>
// //       <Form onSubmit={handleSignup}>
// //         <Form.Group className="mb-3" controlId="formBasicEmail">
// //           <Form.Label>Name</Form.Label>
// //           <Form.Control
// //             type="name"
// //             placeholder="Enter name"
// //             required
// //             onChange={(e) => postdata("name", e.target.value, setData)}
// //             value={data.name}
// //           />
// //         </Form.Group>
// //         <Form.Group className="mb-3" controlId="formBasicEmail">
// //           <Form.Label>Email address</Form.Label>
// //           <Form.Control
// //             type="email"
// //             placeholder="Enter email"
// //             required
// //             onChange={(e) => postdata("email", e.target.value, setData)}
// //             value={data.email}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicPassword">
// //           <Form.Label>Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             placeholder="Password"
// //             required
// //             onChange={(e) => postdata("password", e.target.value, setData)}
// //             value={data.password}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
// //           <Form.Label>Confirm Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             placeholder="Confirm Password"
// //             required
// //             onChange={(e) =>
// //               postdata("confirmPassword", e.target.value, setData)
// //             }
// //             value={data.confirmPassword}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
// //           <Form.Label>Date of Birth</Form.Label>
// //           <Form.Control
// //             type="date"
// //             placeholder="Date of Birth"
// //             required
// //             onChange={(e) => postdata("dateOfBirth", e.target.value, setData)}
// //             value={data.dateOfBirth}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicMobileNumber">
// //           <Form.Label>Mobile Number</Form.Label>
// //           <Form.Control
// //             type="tel"
// //             placeholder="Mobile Number"
// //             onChange={(e) => postdata("mobileNumber", e.target.value, setData)}
// //             value={data.mobileNumber}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicAddress">
// //           <Form.Label>Address</Form.Label>
// //           <Form.Control
// //             as="textarea"
// //             placeholder="Address"
// //             onChange={(e) => postdata("address", e.target.value, setData)}
// //             value={data.address}
// //           />
// //         </Form.Group>
// //         <Button variant="primary" type="submit">
// //           Signup
// //         </Button>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default Signup;
       


// // import React, { useState } from "react";
// // import { Button, Form } from "react-bootstrap";
// // import { useAuth } from "../context/AuthContext";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const Signup = () => {
// //   const { user, signup } = useAuth();
// //   // console.log(user)
// //   const [data, setData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     dateOfBirth: "",
// //     mobileNumber: "",
// //     address: "",
// //   });

// //   const handleSignup = async (e: any) => {
// //     e.preventDefault();

// //     // Name Validation
// //     // if (data.name.trim() === "") {
// //     //   toast.error("Name is required");
// //     //   return;
// //     // }

// //     // // Email Validation
// //     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     // if (!emailRegex.test(data.email)) {
// //     //   toast.error("Invalid email");
// //     //   return;
// //     // }

// //     // // Address Validation
// //     // if (data.address.trim() === "") {
// //     //   toast.error("Address is required");
// //     //   return;
// //     // }
// //     // // Date of Birth validation
// //     // const currentDate = new Date();
// //     // const selectedDate = new Date(data.dateOfBirth);
// //     // if (selectedDate > currentDate) {
// //     //   console.log("Date of Birth should not be a future date");
// //     //   return;
// //     // }

// //     // // Mobile Number validation
// //     // const mobileNumberRegex = /^\d{10}$/;
// //     // if (!mobileNumberRegex.test(data.mobileNumber)) {
// //     //   console.log("Mobile Number should be a 10-digit number");
// //     //   return;
// //     // }

// //     try {
// //       await signup(
// //         data.email,
// //         data.password,
// //         data.name,
// //         data.password,
// //         data.dateOfBirth,
// //         data.mobileNumber,
// //         data.address
// //       );
// //       setData({
// //         name: "",
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //         dateOfBirth: "",
// //         mobileNumber: "",
// //         address: "",
// //       });
// //     } catch (err) {
// //       console.log(err);
// //     }

// //     // console.log(data)
// //   };

// //   return (
// //     <div
// //       style={{
// //         width: "40%",
// //         margin: "auto",
// //       }}
// //     >
// //       <h1 className="text-center my-3 ">Signup</h1>
// //       <Form method="POST">
// //       <Form onSubmit={handleSignup}>
// //         <Form.Group className="mb-3" controlId="formBasicEmail">
// //           <Form.Label>Name</Form.Label>
// //           <Form.Control
// //             type="name"
// //             placeholder="Enter name"
// //             required
// //             onChange={(e: any) =>
// //               postdata("name", e.target.value, setData)
// //             }
// //             value={data.name}
// //           />
// //         </Form.Group>
// //         <Form.Group className="mb-3" controlId="formBasicEmail">
// //           <Form.Label>Email address</Form.Label>
// //           <Form.Control
// //             type="email"
// //             placeholder="Enter email"
// //             required
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 email: e.target.value,
// //               })
// //             }
// //             value={data.email}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicPassword">
// //           <Form.Label>Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             placeholder="Password"
// //             required
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 password: e.target.value,
// //               })
// //             }
// //             value={data.password}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
// //           <Form.Label>Confirm Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             placeholder="Confirm Password"
// //             required
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 confirmPassword: e.target.value,
// //               })
// //             }
// //             value={data.confirmPassword}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
// //           <Form.Label>Date of Birth</Form.Label>
// //           <Form.Control
// //             type="date"
// //             placeholder="Date of Birth"
// //             required
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 dateOfBirth: e.target.value,
// //               })
// //             }
// //             value={data.dateOfBirth}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicMobileNumber">
// //           <Form.Label>Mobile Number</Form.Label>
// //           <Form.Control
// //             type="tel"
// //             placeholder="Mobile Number"
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 mobileNumber: e.target.value,
// //               })
// //             }
// //             value={data.mobileNumber}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicAddress">
// //           <Form.Label>Address</Form.Label>
// //           <Form.Control
// //             as="textarea"
// //             placeholder="Address"
// //             onChange={(e: any) =>
// //               setData({
// //                 ...data,
// //                 address: e.target.value,
// //               })
// //             }
// //             value={data.address}
// //           />
// //         </Form.Group>

// //         <Button variant="primary" type="submit">
// //           Signup
// //         </Button>
// //       </Form>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default Signup;
