import React, { Component } from 'react';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })


    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data
        try {
           const {data} = await axios.post('/register', {
            name, email, password
           }) 
           if(data.error){
            toast.error(data.error)
           } else {
            setData({})
            toast.success('Registration successful. Welcome!')
            navigate('/login')
           }
        } catch (error) {
            console.log(error)
        }
    };

    return(
    <div>
    <div className="signin-header">
        <h1>Trade Botanics</h1>
    </div>
    <div className="bg-screen">
        <div className="register-screen">
            <h2 className="signup-title">Register here</h2>
            <form onSubmit={registerUser}>
                  <div className="input-container">
                    <label>Name</label><br></br>
                    <input type='text' placeholder='enter full name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                  </div>
                  <div className="input-container">
                    <label>Email</label><br></br>
                    <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                  </div>
                  <div className="input-container">
                    <label>Password</label><br></br>
                    <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                  </div>
                  <div className="button-container">
                    <p>Been here before? <a href="/login">Log in here</a></p>
                     <button type='submit'>Sign up</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    )
}