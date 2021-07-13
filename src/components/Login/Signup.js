//This component enables new users to sugnup to the service and register themselves in the firebase

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from "./LoginContexts/AuthContext"
import {  useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {//handle submit butoon button to check if the passwords match and catch the errors
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
  //simple form using react-bootstrap to create a form for the users to enter their details to signup
  return (
    <div className ="signup-bg">
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div  className="w-100" style={{ maxWidth: "300px" }}>
          <Card bg="dark" text="light">
            <Card.Img variant="top" src="https://i.redd.it/l6asg6qyjbr01.png" />
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="info" size="sm" href="/Login">Already have an account? Login</Button>
          </div>
        </div>
      </Container>
      </>
    </div>
  )
}
