import React from 'react'
import NavbarUser from '../layouts/NavbarUser'
import Cookie from 'js-cookie'
import ServiceChange from '../ServiceChange'
import Appointment from '../Appointment'

const Tirechange = () => {

  const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

  const handleChange = (e) => {
    Cookie.set('service', (prevState) => ({ ...prevState, tireservice: e.target.value }));
  }

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center py-3'>Gumiszerviz</h1>
      <div className="container">
        <div className="col-12">

          <div className="col-6 mx-auto">

              <div className="col-6 mx-auto fixed-bottom">
                <div className='border rounded p-3 my-4'>

                  <div className="mb-3">

                    <select className="form-control" name='tireservice' onChange={ServiceChange}>
                      <option value="0" >Válasszon szolgáltatást</option>
                      <option value="2" >Defekt javítás</option>
                      <option value="2" >Szezonális gumicsere</option>
                      <option value="4" >Futómű állítás</option>
                      <option value="0" >Mégsem kérem</option>
                    </select>

                  </div>
                  <Appointment selectedCar={selectedCar} />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tirechange

