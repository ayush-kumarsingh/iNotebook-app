import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { myAlert ,myProgress} from '../App';

export default function Signup() {
    const URL = "https://inotebook-backened-eapl.onrender.com";


    const showalert = useContext(myAlert)
    const setProgress = useContext(myProgress);
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    function onchange(e) {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }

    async function onsubmit(e) {
        e.preventDefault();
        if (userdata.password != userdata.cpassword) {
            showalert('password and confirm password didn\'t match', 'danger');
            return;
        }
        setProgress(10);
        const url = `${URL}/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userdata.name,
                email: userdata.email,
                password: userdata.password
            }),
        });
        setProgress(50);


        const url2 = `${URL}/api/auth/login`;
        const res = await fetch(url2,{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email : userdata.email,
                password : userdata.password
             })
        })
        const json2 = await res.json();
        if(json2.success){
            localStorage.setItem('token',json2.authtoken);
            navigate('/home');
        }
        else{
            showalert('some server error occured', 'danger');
        }
        await showalert('Account created successfully', 'success');
        
        setProgress(100);
    }
    return (
        <div>
            <form onSubmit={onsubmit}>
                <h2 className='mt-4 text-center'>Create a new Account</h2>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control mx-2" id="name" name='name' placeholder='Enter your name' onChange={onchange} minLength={3} />
                </div>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control mx-2" id="email" aria-describedby="emailHelp" name='email' placeholder='Enter your email ' onChange={onchange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control mx-2" id="password" name='password' placeholder='Enter your password' onChange={onchange} required minLength={5} />
                </div>
                <div className="mb-3 pt-3 ps-3 pe-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control mx-2" id="confirm-password" name='cpassword' placeholder='Enter your password again' onChange={onchange} required minLength={5} />
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </div>
            </form>
        </div>
    )
}
