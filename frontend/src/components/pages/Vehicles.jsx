import React from 'react'
import Newcar from '../Newcar'
import Mycars from '../Mycars'
import NavbarUser from '../layouts/NavbarUser'

const Vehicles = () => {
  
  return (
    <div>
      <NavbarUser />
      <Newcar />
      <hr/>
      <Mycars />
    </div>
    
  )
}

export default Vehicles
