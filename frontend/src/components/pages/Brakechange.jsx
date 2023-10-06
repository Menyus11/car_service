import React from 'react'
import NavbarUser from '../layouts/NavbarUser'
import ServiceChange from '../ServiceChange'
import Cookie from 'js-cookie'
import Appointment from '../Appointment'

const Brakechange = () => {

  const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center'>Fékcsere</h1>
      <div className="container">
        <div className="col-6 mx-auto fixed-bottom">
          <div className='border rounded p-3 my-4'>
            <div className="mb-3">

              <select className="form-control" name='brakeservice' onChange={ServiceChange}>
                <option value="0" >Válasszon szolgáltatást</option>
                <option value="3" >Első fékek cseréje</option>
                <option value="3" >Hátsó fékek cseréje</option>
                <option value="6" >Komplett fékszerviz</option>
                <option value="0" >Mégsem kérem</option>
              </select>

            </div>
            <Appointment selectedCar={selectedCar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brakechange
