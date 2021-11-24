import React from 'react'
import './Home.css'
function Table() {
    const del=(id)=>{

    }
    const update=(id,data)=>{
        
    }
    return (
        <>
              <table className="table">
                                <thead className="bg-primary text-center">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        data.length > 0 ?
                                            data.map((data, index) => (
                                                <tr className="text-center">
                                                    <td>{data.title}</td><td>{data.amount}</td>
                                                    <td>
                                                        <button className="btn btn-danger " onClick={() => del(index)}>delete</button>
                                                        <button className="btn btn-warning ml-2" onClick={() => update(index, data)}>Update</button>
                                                    </td>
                                                </tr>
                                            )) : "null"


                                    } */}
                                </tbody>
                            </table>
                         
        </>
    )
}

export default Table
