import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
// import { useAuth } from "../../Login/LoginContexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
export default function Home() {
  return (
    <>
      <Header/>
      <Navbar/>
    </>
  )
}
