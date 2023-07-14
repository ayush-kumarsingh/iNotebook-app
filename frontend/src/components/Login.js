import React, { useContext, useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import { myAlert ,myProgress } from '../App';

export default function Login() {
    const showalert = useContext(myAlert);
    const setProgress = useContext(myProgress);
    const navigate = useNavigate();
    const [user,setuser] = useState({
        email : "",
        password : ""
    })

    const URL = "https://inotebook-backened-eapl.onrender.com";


    async function handlesubmit(e) {
        e.preventDefault();
        const url = `${URL}/api/auth/login`;
        setProgress(10);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"             
            },
            body: JSON.stringify({ 
                email : user.email,
                password : user.password
             })
        });
        setProgress(50);
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate('/home');
            showalert('logged in successfully','success');

        }
        else{
            showalert('invalid credentials', 'danger');
        }
        setProgress(100);
    }

    function handleonchange(e){
        setuser({...user ,[e.target.name] : e.target.value});
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <h2 className='mt-4 text-center'>Login to your Account</h2>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputEmail1 " className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name = "email" aria-describedby="emailHelp" placeholder='Enter your email' onChange={handleonchange} />
                    <div id="emailHelp" className="form-text text-center">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' placeholder='Enter your password' onChange={handleonchange} />
                </div>
                <div className="mb-3 text-center">
                    <p>If you are new to site ,please create an account <Link to='/signup'>SignUp</Link></p>
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </div>
            </form>

        </div>
    )
}
