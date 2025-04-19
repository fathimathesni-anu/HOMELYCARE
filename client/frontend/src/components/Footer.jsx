import React from 'react'

function Footer() {
  return (
    <div>
    <footer className="bg-blue-600 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2025 <span className="font-semibold">homelycareonline.</span> All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-200" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-200" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-gray-200" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
