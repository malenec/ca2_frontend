import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "../routes/Home";
import About from "../routes/About";



function Content({ user }) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home user={user}/>} />
                <Route path="/about" element={<About user={user} />} />
            </Routes>
        </div>
    )
}

export default Content
