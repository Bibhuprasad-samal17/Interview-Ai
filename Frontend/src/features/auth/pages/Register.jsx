import React from 'react'
import { Link, useNavigate } from 'react-router'
const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username </label>
                            <input type="text" id="username"  placeholder='Enter your Username'/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email"  placeholder='Enter your Email'/>
                        </div>


                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder='Enter your Password' />
                        </div>
                        <button type="submit" className="button">Register</button>
                    </form>

                    <p>Already have an account? <Link to="/login">Login</Link>
                   </p>
                </div>
            </main>
        </div>
    )
}

export default Register
