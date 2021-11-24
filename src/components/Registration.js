import React, { useState, useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'

import './Registration.css'
import axios from 'axios';
const bcrypt = require('bcryptjs')
var mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
var passFormat = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

const URL ="http://localhost:3001/budget";


function Registration() {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        fname:"",lname:"",username:"",email:"",pass:"",cpass:""
    })
    const [errors,setErrors] = useState({})
    const [isSumbit,setIsSubmit] = useState(false)

    const handler = (e) =>{
        const {name,value} = e.target;
        setValues({...values,[name]:value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(null)
        setIsSubmit(true)
        let temp = validate(values)

        if(temp.length===0){
           
        const hashPass = bcrypt.hashSync(values.pass, bcrypt.genSaltSync());
        if(isSumbit){
        let formData ={
            
            fname:values.fname,
            lname:values.lname,
            username:values.username,
            email:values.email,
            pass:hashPass,
            cpass:values.cpass,
            expense:[],
            total:0,
            balance:0
        }
        axios.post(URL,formData)
        alert("Regsitered Successfully")
        axios.get(URL)
        .then(res=>console.log(res.data))
        navigate('/')
    }
}
    }


    const validate = (values) =>{
        const e =[]
        const errors={};
        if(!values.fname){
            e.push({fname:"first name required"})
            errors.fname = "First Name is required"
        }else if(values.fname.length<3){
            e.push({fname:"first Name should be greater than 3 letters"})
            errors.fname = "First Name should be greater than 3 letters"
        }
        if(!values.lname){
            e.push({lname:"Last Name is required"})
            errors.lname = "Last Name is required"
        }else if(values.lname.length<3){
            e.push({lname:"Last Name should be greater than 3 letters"})
            errors.lname = "Last Name should be greater than 3 letters"
        }
        if(!values.username){
            e.push({username:"Username is required"})
            errors.username = "Username is required"
        }else if(values.username.length<3){
            e.push({username:"Username should be greater than 3 letters"})
            errors.username = "Username should be greater than 3 letters"
        }
        if(!values.email){
            e.push({email:"Email is required"})
            errors.email = "Email is required"
        }else if(!mailformat.test(values.email)){
            e.push({email:"Invalid Email Addressd"})
            errors.email = "Invalid Email Address"
        }
        if(!values.pass){
            e.push({pass:"Password is required"})
            errors.pass = "Password is required"
        }else if(passFormat.test(values)){
            e.push({pass:"Password should be more than 8 Characters with First Letter capital,it must contain a special character and numbers"})
            errors.pass = "Password should be more than 8 Characters with First Letter capital,it must contain a special character and numbers "
        }
        
        if(!values.cpass){
            e.push({cpass:"Confirm Password Required"})
            errors.cpass = "Confirm Password Required"
        }else if(values.cpass !== values.pass){
            e.push({cpass:"Passwords do no match"})
            errors.cpass = "Passwords do no match"
        }


        setErrors(errors)
        return e

    }

useEffect(()=>{
    if(Object.keys(errors).length===0 && isSumbit){
        console.log(errors);
    }
},[errors])

    return (
        <>
            <div className="container">
            {/* <h3 className="mt-2 ml-5"> Regsiteration Page</h3> */}
                <div className="boxr">
                              
                    <div className="col-md-10 offset=md-1">
                        <div className=" iboxr">
                            {/* <div className=" register-left">
                                {/* <h3 className="mt-5"> Regsiteration Page</h3> */}
                                {/* <button className="btn btn-danger w-100 mt-4">Google</button><br/><br/>
                                <button className="btn btn-primary mb-5  w-100">Facebook</button> */}
                                {/* <div className="mt-5 p-4"><p>Alredy Registered? Click here to <i><Link to="/">Login</Link></i></p></div> */}
                            {/* </div> */} 
                            <div className=" register-right">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>First Name</label>
                                            <input type="text" name="fname" className="form-control" value={values.fname} placeholder="First Name" onChange={handler}/>
                                            {errors.fname && <p className="alert alert-danger error">{errors.fname}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name</label>
                                            <input type="text" name="lname" className="form-control" value={values.lname} placeholder="Last Name" onChange={handler}/>
                                            {errors.lname && <p className="alert alert-danger error">{errors.lname}</p>}

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" name="username" className="form-control" value={values.username} placeholder="Enter Username" onChange={handler}/>
                                        {errors.username && <p className="alert alert-danger error">{errors.username}</p>}

                                    </div>
                                    <div className="form-group">
                                        <label> Email</label>
                                        <input type="text" className="form-control" name="email" value={values.email} placeholder="Enter Email id" onChange={handler}/>
                                        {errors.email && <p className="alert alert-danger error">{errors.email}</p>}

                                    </div>
                                  
                                    <div className="form-group">
                                        <label> Password</label>
                                        <input type="password" className="form-control" name="pass" value={values.pass} placeholder="Enter Password" onChange={handler}/>
                                        {errors.pass && <p className="alert alert-danger error">{errors.pass}</p>}

                                    </div> <div className="form-group">
                                        <label> Confirm Password</label>
                                        <input type="password" className="form-control" name="cpass" value={values.cpass} placeholder="Confirm Password" onChange={handler}/>
                                        {errors.cpass && <p className="alert alert-danger error">{errors.cpass}</p>}

                                    </div>
                                    <button type="submit" className="btn btn-success buttonr">Regsiter</button>
                                </form>
                                <div className="mt-2"><p>Alredy Registered? Click here to <i><Link to="/">Login</Link></i></p></div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Registration
