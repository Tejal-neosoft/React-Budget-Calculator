import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import SocialButton from './SocialButton';
import './Login.css'
//for password encryption
const bcrypt = require('bcryptjs')

const URL = "http://localhost:3001/budget";

function Login() {
    //to load home
    const [flag, setFlag] = useState(false) 
    //naviagte the link
    const navigate = useNavigate()
    //to add data in server
    const [apiData, setApiData] = useState([]) 
    //to get value from input field
    const [values, setValues] = useState({
        email: "", pass: ""
    })
    const [errors, setErrors] = useState({}) //for defining errors
    const [isSumbit, setIsSubmit] = useState(false) //to check errors

    //assign i/p values
    const handler = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
//for social login
    const handleSocialLogin = async (user) => {
        console.log(user);
        let temp = [];
    await  axios.get(URL)
        .then(res => {
            console.log(res.data)
            temp=[...res.data]
        })
        console.log("yemp",temp);

        let userlogin = temp.find(x => x.email === user._profile.email)
        let userIndex = temp.indexOf(userlogin)
        console.log(userlogin)
        console.log(userIndex)

        if (userIndex + 1) {
            sessionStorage.setItem('mycart', JSON.stringify(temp[userIndex]));

            setFlag(true)
        }
        else {
           
            let formData = {
                fname: user._profile.firstName,
                lname: user._profile.lastName,
                uername: user._profile.id,
                email: user._profile.email,
                pass: 'socialLogin',
                total: 0,
                expense: [],
                balance: 0
            };
            
            axios.post(URL, formData)
            sessionStorage.setItem('mycart', JSON.stringify(formData));

            setFlag(true)

        }
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    const refresh = () => {
        axios.get(URL)
            .then(res => {
                console.log(res.data)
                setApiData(res.data)
            })
            console.log(apiData);
    }

   
    //for submmiting the data
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values))
        setIsSubmit(true)
        var condn = false;
        refresh()


        apiData.forEach(user => {
            const doesPasswordMatch = bcrypt.compareSync(values.pass, user.pass)
            console.log(values.pass, doesPasswordMatch);
            if (user.email === values.email && doesPasswordMatch) {
                let arr = user
                alert('login succesfully');
                if (sessionStorage.getItem('mycart') !== undefined) {
                    sessionStorage.setItem('mycart', JSON.stringify(arr))
                }

                condn = true;
                setFlag(true)
                return


            }

        });
        if (condn !== true) {
            alert('Email id or password is incorrect');
            setFlag(false)

        }

    }

    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required"
        }
        if (!values.pass) {
            errors.pass = "Password is required"
        }
        return errors
    }


    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSumbit) {
            console.log(errors);
        }
    }, [errors])



    return (
        <>
            <div className="container">
                <div className="row  box">
                    <div className="col-md-10 offset=md-1">
                        <div className="row ibox">
                            <div className="col-md-5 register-left img">
                                <h3 style={{ letterSpacing: '1px', fontStyle: 'italic' }}>Login with Social Media</h3>
                                <SocialButton
                                    provider="google"
                                    appId="900283562052-2efr8jp51668cnlfofbjp2up2uge178s.apps.googleusercontent.com"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                    style={{ color: "red" }}>
                                    Continue With Google
                                </SocialButton>

                                
                                <div className="mt-5 " style={{ letterSpacing: '1px' }}><p>New User? Click here to  <i><Link to="/register">Register</Link></i></p></div>
                            </div>
                            <div className="col-md-7 login-right">
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label> Email</label>
                                        <input type="text" name="email" className="form-control" placeholder="Enter Email id" value={values.email} onChange={handler} />
                                        {errors.email && <p className="alert alert-danger error">{errors.email}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label> Password</label>
                                        <input type="password" name="pass" className="form-control" placeholder="Enter Password" value={values.pass} onChange={handler} />
                                        {errors.pass && <p className="alert alert-danger error">{errors.pass}</p>}
                                    </div>


                                    <button type="submit" className="btn btn-primary button">Login</button>
                                </form>
                                {flag ? navigate('/home') : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login
