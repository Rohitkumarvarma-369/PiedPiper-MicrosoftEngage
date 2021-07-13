//This component implements the forget password feature using the Firebase support, where Firebase sends the confirmation mail to the provided mail.

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from "./LoginContexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {//handle function to handle the submit button when rest password is initiated
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }
//Form using react-bootstrap to take user inputs of email to send the confirmation mail
  return (
    <div className="forgot-password-bg">
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div  className="w-100" style={{ maxWidth: "400px" }}>
          <Card bg="dark" text="light">
            <Card.Img variant="top" src="https://i.redd.it/l6asg6qyjbr01.png" />
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="info" size="sm" href="/signup">Need an account? Sign-up</Button>
          </div>
        </div>
      </Container>
      </>
    </div>
  )
}
