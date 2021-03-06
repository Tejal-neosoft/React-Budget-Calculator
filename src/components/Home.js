import React, { useRef, useState, useEffect } from 'react'
import './Home.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';


const regForName = RegExp(/^[a-zA-Z]/);
const URL = "http://localhost:3001/budget"
function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [user, setuserdata] = useState([]) //array of expenses
    const [index, setindex] = useState(0);

    const [togglebtn, setToggleBtn] = useState(true)
//to display
    const [budget, setbudget] = useState(0)
    const [expense, setexpenses] = useState(0)
    const [balance, setbalance] = useState(0)

    const titleRef = useRef(null)
    const amountRef = useRef(0)
    const budgetRef = useRef(0)
    
    const addBudget = () => {
        const user = JSON.parse(sessionStorage.getItem('mycart'));
        const budg = parseFloat(budgetRef.current.value)
        if (budg > 0) {
            user.total = parseFloat(user.total + budg)
            user.balance = user.balance + budg
            sessionStorage.setItem('mycart', JSON.stringify(user))
            budgetRef.current.value = ""
          
        }
        else {
            alert("Budget Should be more than Zero")
        }
        localData()


    }


    const addExpense = () => {

        const user = JSON.parse(sessionStorage.getItem('mycart'))
        const usertitle = titleRef.current.value
        const useramount = parseFloat(amountRef.current.value)
        if (usertitle != null && regForName.test(usertitle)) {
            const saving = expense + useramount
            sessionStorage.setItem('mycart', JSON.stringify(user))

            if (useramount > 0) {
                if (saving <= budget) {
                    const expense1 = { title: usertitle, amount: useramount }
                    user.expense = [...user.expense, expense1]

                    sessionStorage.setItem('mycart', JSON.stringify(user))
                    titleRef.current.value = ""
                    amountRef.current.value = ""
                }
                else {
                    alert("Balance is insufficient")
                }

            }

            else {
                alert("Budget Shold be more than Zero")
            }
        }
        else {
            alert("Please enter title")
        }
        localData()
    }

    const del = (index) => {
        const user = JSON.parse(sessionStorage.getItem('mycart'))
        const res = window.confirm("Do You really want to delele this?")
        if (res == true) {
            user.expense.splice(index, 1)
            // setData({ ...user });
            sessionStorage.setItem('mycart', JSON.stringify(user));
        }
        const user1 = JSON.parse(sessionStorage.getItem('mycart'))
        const userdata = user1.expense
        setuserdata([...userdata])
        localData()
    }
    const edit = () => {
        let user = JSON.parse(sessionStorage.getItem('mycart'));
        let temp = user.expense
        temp[index].title = titleRef.current.value
        temp[index].amount = parseFloat(amountRef.current.value)
        user.expense = temp
        sessionStorage.setItem('mycart', JSON.stringify(user))
        setuserdata([...user.expense])
        titleRef.current.value = null
        amountRef.current.value = null
        setToggleBtn(true)
        localData()
    }

    const update = (index, data) => {
        titleRef.current.value = data.title
        amountRef.current.value = data.amount
        setindex(index)
        setToggleBtn(false)
    }
    // const localData=()=>{
    //     if (sessionStorage.getItem('mycart') !== undefined) {
    //         const user1 = JSON.parse(sessionStorage.getItem('mycart'))
    //         const userd = user1.expense
    //         setuserdata([...userd])

    //     }
    //     const user = JSON.parse(sessionStorage.getItem('mycart'))
    //     setbudget(user.total)
    //     let exp = 0
    //     user.expense.map(ele=>{
    //         exp=ele.amount+exp
    //     })
    //     setexpenses(exp)
    //     setbalance(budget-expense)
    //     user.balance = balance
    //     sessionStorage.setItem('mycart', JSON.stringify(user))

    // }
    // useEffect(() => {
    //   localData()
    //   const user = JSON.parse(sessionStorage.getItem('mycart'))
    //   setbalance(budget-expense)
    //     user.balance = balance
    //     sessionStorage.setItem('mycart', JSON.stringify(user))

    // },[])


    // useEffect(() => {
    //     if (localStorage.getItem('mycart') !== undefined) {
    //         console.log('samiksha')
    //         refresh()
    //     }
    // }, [])

    // const refresh = () => {

    //     const user1 = JSON.parse(localStorage.getItem('mycart'))
    //     const userd = user1.budget
    //     setuserdata([...userd])
    //     setbudgetdisplay(user1.totalbudget)
    //     let exp = 0
    //     user1.budget.map(ele =>
    //         exp = ele.amount + parseFloat(exp)
    //     )
    //     user1.balance = user1.totalbudget - exp
    //     setexpensesdisplay(exp)
    //     setbalance(user1.totalbudget - exp)
    //     localStorage.setItem('mycart', JSON.stringify(user1))


    // }
    const localData = () => {
        if (JSON.parse(sessionStorage.getItem('mycart')) !== undefined) {
            const user1 = JSON.parse(sessionStorage.getItem('mycart'))
            const userd = user1.expense
            setuserdata([...userd])
            setbudget(user1.total)
            let exp = 0
            user1.expense.map(ele => {
                exp = ele.amount + exp
            })
            user1.balance = user1.total - exp
            setexpenses(exp)
            setbalance(user1.total - exp)
            sessionStorage.setItem('mycart', JSON.stringify(user1))
        }


    }
    useEffect(() => {

        if (sessionStorage.getItem('mycart') !== undefined) {
            console.log('tejal');
            localData()
        }
       

    }, [])


    const log = () => {
        if (JSON.parse(sessionStorage.getItem('mycart')) !== undefined) {
            let data = JSON.parse(sessionStorage.getItem('mycart'))
            axios.put(`${URL}/${data.id}`, data)
            sessionStorage.removeItem('mycart');
        }

    }




    return (
        <>
            {sessionStorage.getItem('mycart') === undefined &&
                // <Navigate to="/"></Navigate>}
                navigate("/")

            }

            <nav class="navbar navbar-dark m-0 bg-info">
                <span class="navbar-brand mb-0 h1">Buget-Expense Tracker</span>
                <span class="navbar-brand mb-0 h1">{JSON.parse(sessionStorage.getItem('mycart')).fname}({JSON.parse(sessionStorage.getItem('mycart')).email})</span>
                <button className="btn btn-danger text-white" style={{ textDecoration: 'none', color: 'white' }} onClick={log}><Link to="/" style={{ color: 'white' }}>Logout</Link></button>

            </nav>

            <div className="container-fluid m-0 p-0">


                {sessionStorage.getItem('mycart') !== undefined ?
                    <div className="container add-budget">
                        <div className="container text-center display-budget">
                            <div className="row ml-2">
                                <div className="col-lg-4">
                                    <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>  Budget:</span><br />
                                    <i class="fa fa-money" style={{ fontSize: "50px", color: "green" }}></i><br /><span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>  Rs.{budget}</span>

                                </div>
                                <div className="col-lg-4">

                                    <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>Expenses:</span><br />

                                    <i class="fa fa-credit-card" style={{ fontSize: "50px", color: "green" }}></i><br /><span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>  Rs.{expense}</span>

                                </div>
                                <div className="col-lg-4">
                                    <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>Balance:</span><br />

                                    <i class="fa fa-inr" style={{ fontSize: "50px", color: "green" }}></i><br />
                                    <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>  Rs.{balance}</span>
                                </div>

                            </div>
                            {/* <div className="text-right"><button className="btn btn-primary" onClick={log}>Save Data</button><br /></div> */}

                        </div>
                        <div className="conatiner row home-left">
                            <div className="col-lg-5 budget-contain">

                                <input type="number" className="form-control" placeholder="Enter Budget" ref={budgetRef} />
                                <button className="btn btn-outline-success mt-4" onClick={addBudget} >Add Budget</button>

                            </div>


                            <div className="container col-lg-6  expense-contain ">
                                <input type="text" className="form-control" placeholder="Enter Your Expense" ref={titleRef} />
                                <input type="number" className="form-control mt-2" placeholder="Enter Your Amount" ref={amountRef} />
                                {/* <button className="btn btn-outline-warning mt-2" onClick={addExpense}>Add</button>  */}
                                {togglebtn ? <button className="btn btn-outline-warning mt-2" onClick={addExpense}>Add</button> : <button onClick={edit} className="btn btn-outline-warning mt-2">Edit</button>}
                            </div>
                        </div>
                        <div className=" home-right">

                            <div className="container data-contain">
                                <table className="table table-striped table-bordered">
                                    <thead className="bg-primary text-center">
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            user.length > 0 ?
                                                user.map((data, index) => (
                                                    <tr className="text-center">
                                                        <td>{data.title}</td><td>{data.amount}</td>
                                                        <td>
                                                            <button className="btn btn-danger " onClick={() => del(index)}>delete</button>
                                                            <button className="btn btn-warning ml-2" onClick={() => update(index, data)}>Update</button>
                                                        </td>
                                                    </tr>
                                                )) : <tr> <td colSpan="3" style={{ fontSize: 25, fontWeight: "bold" }}>  No Data to Display </td> </tr>


                                        }
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div> : navigate("/")}

                {/* </div> : <Navigate to="/"></Navigate> } */}
            </div>


        </>
    )
}

export default Home
