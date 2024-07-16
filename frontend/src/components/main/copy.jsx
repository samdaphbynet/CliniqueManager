import React from 'react'

const Appointment = () => {
    const handleAppointment = (e) => {
        e.preventDefault();
        console.log('appointment');
    }

  return (
    <div className="login-register">
      <div className="login">
        <div className="user_login">
          <form>
            <label>firstName</label>
            <input type="text" className="input"/>
            <br />

            <label>lastName</label>
            <input type="text" className="input"/>
            <br />

            <label>Email</label>
            <input type="text" className="input"/>
            <br />

            <label>Password</label>
            <input type="password" className="input"/>
            <br />

            <label>Phone</label>
            <input type="number" className="input"/>
            <br />

            <label>Birth</label>
            <input type="date" className="input"/>
            <br />

            <label>Gender</label>
            <select className='form-control input'>
                <option value="select">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label>Role</label>
            <select className="form-control input">
              <option value="role">Select Your Role</option>
              <option value="doctor">Doctor</option>
              <option value="user">Patient</option>
              <option value="admin">Admin</option>
            </select>

            <div className="action_btns">
              <div className="one_half last">
                <button onClick={handleAppointment} className="btn btn-primary px-4 py-2 m-2 text-center">
                  Take Appointement
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Appointment