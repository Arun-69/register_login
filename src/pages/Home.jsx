import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Api/Auth";
import { doc, getDoc } from "firebase/firestore";
import "./Home.css";



function Home() {
  const navigate = useNavigate();
  const [user,setUser] = useState({name:"",email:""});
  useEffect(()=>{
    const token = localStorage.getItem("Token");
    if(!token){
      console.log("please Login first");
      
    }else{
      const res = async ()=>{
        const uid = auth.currentUser.uid;
        if(!uid)return;
        const udoc = await getDoc(doc(db,"users",uid))
        if(udoc.exists()){
          setUser(udoc.data())
        }
      };res();
    }
  },[navigate])
 const handleLogout = ()=>{
      auth.signOut();
      localStorage.removeItem("Token")
      navigate("/Login")
  }
  return (
    <>
       <div>
        <div className="nav">
          <nav>
            <div>
              <img src="" alt="logo" />
              <h3>Title</h3>
            </div>
            <div>
              <Link to={"/"}>Home</Link>
              <Link to={"/Register"}>Register</Link>
              <Link to={"/Login"}>Login</Link>
              <button className="btn" onClick={handleLogout}>LogOut</button>
            </div>
          </nav>
        </div>
        <br />
        <div className="cart">
          <h5>Welcome To {user.name || "User"}</h5>
          <p>{user.email || "User Email"}</p>
        </div>
       </div>
            
    </>
   
  )
}

export default Home