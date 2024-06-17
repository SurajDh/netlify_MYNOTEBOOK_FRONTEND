import React from 'react'

function Alert(props) {

    return (
        <div style={{height: '50px' , position:"fixed",width:"100%"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{props.alert.msg}</strong> 
        </div>}
        </div>
    )
}

export default Alert