import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from "./LoginContexts/AuthContext"
import { useHistory } from "react-router-dom"
import './Login.css';

export default function Login() {//declating refs to store the parameters used for authorization
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {//handle submit function to handle errors and submissions done by users 
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Login Failed, Try again!")
    }

    setLoading(false)
  }
//Form using react-bootstrap to enable user to input the required values
  return (
    <div className="login-bg">
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div  className="w-100" style={{ maxWidth: "300px" }}>
          <Card bg="dark" text="light">
            <Card.Img variant="top" src="https://i.redd.it/l6asg6qyjbr01.png" />
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
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
                <Button disabled={loading} className="w-100" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Button variant="warning" size="sm" href="/forgot-password">Forgot Password</Button>
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
