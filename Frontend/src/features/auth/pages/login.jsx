import React from 'react'
import "../auth.form.scss"
import {useNavigate,Link} from 'react-router'

const login = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
    }

    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <button type="submit" className="button">Login</button>
                    </form>

                    <p>Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default login
