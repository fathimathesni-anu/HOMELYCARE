import React from 'react'

function Header() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HomleyCare</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
