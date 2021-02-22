import React from 'react'
import './button.css'

function FakeButton({ label, onClick }) {
  return (
    <div data-testid="button" className="button-style" onClick={onClick}>
      {label} Hello
    </div>
  )
}

export default FakeButton
