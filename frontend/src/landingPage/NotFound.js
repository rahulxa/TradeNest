import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='container p-5 mt-5'>
            <div className='row text-center'>
                <h1 className='mt-5'>404 not found</h1>
                <p className='mt-3 text-muted'>Sorry the page you are looking for does not exists.</p>
            </div>
        </div>
    )
}

export default NotFound