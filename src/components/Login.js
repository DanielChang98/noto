//login page

import React, { useRef, useState } from "react"
import FirebaseLogin from '../Firebase/LoginFirebaseInit'
//import FirebaseInit from '../contexts/FirebaseInit'
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //function for handling submitted login form
  async function handleSubmit(e) {
    e.preventDefault()  //prevent form from being refreshed

    try {
      setError("")  //reset error message
      setLoading(true)  //prevent form from being submitted multiple times
      await login(emailRef.current.value, passwordRef.current.value) //await - wait for login to finish
      FirebaseLogin();
      history.push("/home") //navigate user to dashboard
    } catch {
      setError("Wrong email address or password")
    }

    setLoading(false)
  }

  return (
    <>    
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="w-100 mt-2 p-4">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email address</Form.Label><br />
                <Form.Control type="email" placeholder="Enter your email address" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label><br />
                <Form.Control type="password" placeholder="Enter your password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
                  </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link><br />
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </Container>
    </>
  )
}