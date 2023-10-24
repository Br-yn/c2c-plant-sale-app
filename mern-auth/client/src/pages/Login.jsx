import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            });
            if(data.error) {
                toast.error(data.error)
            }else {
                setData({});
                navigate('/')

            }
        } catch (error) {
            
        }
    }
    return(
        <div>
        <div className="login-header">
        <h1>Trade Botanics</h1>
        </div>
        <div className="bg-screen">
          <div className="login-screen">
            <h2 className="login-title">Log In</h2>
            <form onSubmit={loginUser}>
              <div className="input-container">
                <label>Email</label><br></br>
                <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
              </div>
              <div className="input-container">
                <label type="password">Password</label><br />
                <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
              </div>
              <div className="button-container">
                <p>New around here? <a href="/register">Sign up</a></p>
                <button type="submit">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}