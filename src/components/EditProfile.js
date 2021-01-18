//edit profile - password

import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function EditProfile() {
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //function to handle submitted update profile form
  function handleSubmit(e) {
    e.preventDefault()  //prevent form from being refreshed

    //password validation
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    //udpdate password
        if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    //run all promises
    Promise.all(promises)
      .then(() => {
        history.push("/home")  //return to dashboard
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    <NavBar/>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Edit Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label><br />
                  <Form.Control
                    type="password"
                    ref={passwordRef}                    
                    required
                    placeholder="Enter your new password"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label><br />
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    placeholder="Repeat your new password"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Update
            </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}