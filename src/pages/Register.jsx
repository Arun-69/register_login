import React, { useState  } from "react";
import { useNavigate ,Link } from "react-router-dom";
import "./Register.css";
import { auth, db } from "../Api/Auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


function Register() {
  const navigate = useNavigate();
  const checkNumberUnique = async (number) => {
  const q = query(collection(db, "users"), where("number", "==", number));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    number:"+91",
  });

  const handleChange = (e) => {
  let value = e.target.value;

  if (e.target.name === "number") {
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/^\+?/, "");
    }
    if (value === "+91") {
      value = "+91";
    }
  }

  setUser({
    ...user,
    [e.target.name]: value,
  });
};


  const Submithandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.cpassword) {
      alert("Password And Confirm password is Not Same");
      return;
    }
     const isUnique = await checkNumberUnique(user.number);
  if (!isUnique) {
    alert("This mobile number is already registered.");
    return;
  }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        name: user.name,
        email: user.email,
        uid: res.user.uid,
        number: user.number,
        createdAt: new Date(),
      });
      const token = await res.user.getIdToken();
      localStorage.setItem("Token",token)
      console.log("TOKEN =", token);
      alert("User Registered Successfully!");

     navigate("/Login");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="container">
      <div className="form">
        <form onSubmit={Submithandler}>
          <h3>Register Now</h3>

          <label>Enter Your Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label>Enter Your Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label>Enter Your Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label>Enter Your Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={user.cpassword}
            onChange={handleChange}
            required
          />
          <label>Enter Your Mobile Number</label>
          <input
            type="tel"
            name="number"
            value={user.number}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-secondary">
            Submit
          </button>

          <p className="p">You Have Already Register Please <Link to={"/Login"}>Login?</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
