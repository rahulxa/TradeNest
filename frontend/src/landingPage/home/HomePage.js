import React from 'react'
import Hero from './Hero'
import Awards from './Awards'
import Pricing from './Pricing'
import Education from './Education'
import OpenAccount from '../OpenAccount'
import Stats from "./Stats"
import Navbar from '../Navbar'
import Footer from '../Footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      <Footer />
    </>
  )
}

export default HomePage