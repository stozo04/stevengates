"use client" // Tells NextJS that this is Client - Enables client side interactions
import React, { useState } from 'react'
import { Button } from './ui/button'
const ClickMeButton = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
const alertUser = () => {setIsSignedIn(!isSignedIn); alert(!isSignedIn)}
  return (
  <div>
    <Button onClick={alertUser}>Click Me </Button>
    {
        isSignedIn ? (
          "Signed In"
        ) : (
          "Signed Out"
        )
      }
    </div>
  )
}
export default ClickMeButton