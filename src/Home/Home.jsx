

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CalendarScheduler from '../StudentPortal/calendar/CalendarScheduler'
import Navbar from '../StudentPortal/Navbar/Navbar'
import Resources from '../StudentPortal/Resources/Resources'

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userInsession = sessionStorage.getItem('access_token')
        const token = JSON.parse(userInsession)
        if (!token) {
            navigate('/auth')
        }
    }, [])
    return (
        <div>
            <Navbar />

        </div>
    )
}

export default Home