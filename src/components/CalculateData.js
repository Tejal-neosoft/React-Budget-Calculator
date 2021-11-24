import React from 'react'

function CalculateData() {
    return (
        <>
            <div className="col-lg-4">
                <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>  Budget</span>:<br />
                <i class="fa fa-money" style={{ fontSize: "50px", color: "green" }}></i><br />
              
            </div>
            <div className="col-lg-4"> 
             
                <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>Expenses:</span><br />

                <i class="fa fa-credit-card" style={{ fontSize: "50px", color: "green" }}></i><br />
               
            </div>
            <div className="col-lg-4">
                                    <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>Balance:</span><br />

                                    <i class="fa fa-inr" style={{ fontSize: "50px", color: "green" }}></i><br />
                                    </div>
                            
            
        </>
    )
}

export default CalculateData
