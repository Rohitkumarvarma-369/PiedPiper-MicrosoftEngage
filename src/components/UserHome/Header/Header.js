import React, { useState } from "react"
import { Card, Alert, Dropdown } from "react-bootstrap"
import { useAuth } from "../../Login/LoginContexts/AuthContext"
import { useHistory } from "react-router-dom"
import "./Header.css"


export default function Header() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    
      <Card className="custom-header-card">
        <Card.Body>
          
          <h1><strong><a className="header-title" href="/">PiedPiper</a></strong></h1>
          <div className="settings-box">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Account setting
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}> Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong className="email-show">Email:</strong> <span className="email-main">{currentUser.email}</span>
          </div>
        </Card.Body>
      </Card>
    </>

  )
}
