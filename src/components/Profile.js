import React, { useState, useEffect } from 'react';
import editicon from '../icons/edit.png'

export default function Profile(props) {

  const [credentials, setCredentials] = useState({ "newname": "", "email": "", "password": "", "newpassword": "", "confirmpassword": "" });
  const [isEditing, setIsEditing] = useState(false);

  const submitvals = async (e) => {
    e.preventDefault();
    const { newname, email, password, newpassword } = credentials;
    const response = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/auth/changedetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newname: newname, email: email, password: password, newpassword: newpassword }),
    });

    const json = await response.json();
    if(json.success){
      setIsEditing(false);
      setCredentials({ ...credentials, password: '', newpassword: '', confirmpassword: '' });
      props.showAlert("Details Updated","success");
    }else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const handleNameClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      setCredentials({ ...credentials, newname: json.name, email: json.email });
      setIsEditing(false);

    };

    getUserDetails();// eslint-disable-next-line
  }, []);


  const onChange = (e, field) => {
    switch (field) {
      case 'password':
        setCredentials({ ...credentials, password: e.target.value });
        break;
      case 'newpassword':
        setCredentials({ ...credentials, newpassword: e.target.value });
        break;
      case 'confirmpassword':
        setCredentials({ ...credentials, confirmpassword: e.target.value });
        break;
      case 'newname':
        setCredentials({ ...credentials, newname: e.target.value });
        break;
      default:
        break;
    }
  }

  return (

    <div className='container'>
      <form onSubmit={submitvals}>
        <div className='yourProfileHeading'>
          <h2>
            <strong>
              Your Profile <hr />
            </strong>
          </h2>
        </div>


        <div className="content align-items-center" >
          <span className='nameSpan d-flex align-items-center' >
            <p className='name my-2 mx-2'>Name : </p>
            {
              isEditing ? <input type="text" value={credentials.newname} onChange={(e) => onChange(e, 'newname')}
              />
                :
                <p className='username my-2 mx-2'>{credentials.newname}</p>
            }
            {
              isEditing ?
                <button type="submit" className="btn btn-primary mx-2">save</button>
                :
                <>
                  <img className='img' onClick={handleNameClick} src={editicon} alt="editicon" style={{ cursor: "pointer", width: '1.2rem', height: '1.2rem', verticalAlign: "middle" }} />
                  <p>
                    <i>
                      (edit name)
                    </i>
                  </p>
                </>
            }
          </span>

          <span className='d-flex align-items-center'>
            <p className='my-2 mx-2'>Email : </p>
            <p className='my-2 mx-2'>{credentials.email}</p>

            <p><i> *(You can not change email)</i></p>

          </span>


          <hr /><br />
        </div>
      </form>
      <form onSubmit={submitvals}>
        <h4>Change Password</h4>
        <div className="form-group my-3">
          <label htmlFor="title">Old Password</label>
          <input type="password" className="form-control" id="oldPassword" value={credentials.password} name='password' aria-describedby="emailHelp" onChange={(e) => onChange(e, 'password')} minLength={5} required />

        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">New Password</label>
          <input type="password" className="form-control" id="newPassword" name='newPassword' value={credentials.newpassword} onChange={(e) => onChange(e, 'newpassword')} minLength={5} required />
        </div>

        <div className="form-group my-3">
          <label htmlFor="tag">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={credentials.confirmpassword} onChange={(e) => onChange(e, 'confirmpassword')} minLength={5} required />
        </div>

        <button type="submit" disabled={credentials.newpassword !== credentials.confirmpassword} className="btn btn-primary">Update Password</button>

      </form>
    </div>

  )
}

