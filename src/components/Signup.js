import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {



    const [credentials, setcredentials] = useState({ "name": "", "email": "", "password": "", "cpassword": "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json);
        if (json.success){
            //Save auth token to local store and redirect
            localStorage.setItem("token",json.authtoken);
            navigate("/");
            props.showAlert("User created", "success");

        }
        else{
           props.showAlert(json.error, "danger");

        }
    }


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} required  minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} required minLength={5}/>
                </div>

                <button type="submit" className="btn btn-primary" disabled={credentials.cpassword!== credentials.password}>Submit</button>
            </form>

        </div>
    )
}

export default Signup
