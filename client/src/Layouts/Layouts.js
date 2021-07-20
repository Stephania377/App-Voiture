import React from 'react'
import Naviguation from '../Components/Naviguation'
import Footer from '../Components/Footer'

const Layouts = ({ children }) => {
    return (
        <>
            <header>
                <Naviguation />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layouts
