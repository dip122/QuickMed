import React from 'react'
import AdminNavbar from '../Component/AdminNavbar/AdminNavbar'

const DashBoard = () => {
  return (
    <>
        <AdminNavbar/>
        <div className = "min-h-screen flex justify-center items-center text-3xl font-semibold">Welcome, Admin DashBoard!</div>
    </>
  )
}

export default DashBoard