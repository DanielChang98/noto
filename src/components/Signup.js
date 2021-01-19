//sign up 

import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup} = useAuth()
  const [error, setError, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //function for handling submitted sign up form
  async function handleSubmit(e) {
    e.preventDefault()  //prevent form from being refreshed

    if(passwordRef.current.value.length <6 ){
      return setError("Please use password with at least 6 characters.")
    }

    //validation for password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setError("")  //reset error message
    setLoading(true)  //prevent form from being submitted multiple times

    try {
      //await - wait for signup to finish
      await signup(emailRef.current.value, passwordRef.current.value) //create account      
    } catch(error){
      switch (error.code) {
        case 'auth/email-already-in-use':
        alert('Email already in use !')
      break;
      default:
        setError("Failed to create an account")
    }
  }

    //run all promises
    Promise.all(promises)
      .then(() => {
        setMessage("Account created successfully. Log in to continue.")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
        //history.push('/')
      })

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
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Control type="email" ref={emailRef} placeholder="Enter your email" required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Control type="password" ref={passwordRef} placeholder="Enter your password (min. 6 characters)" required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Control type="password" ref={passwordConfirmRef} placeholder="Repeat your password" required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
            </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link><br />
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
