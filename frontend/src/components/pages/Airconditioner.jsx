import React from 'react'
import Cookie from 'js-cookie'
import ServiceChange from '../ServiceChange';
import NavbarUser from '../layouts/NavbarUser';
import Appointment from '../Appointment';



const Airconditioner = () => {

  const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center'>Klimaszerviz</h1>
      <div className="col-12">

        <div className="col-6 mx-auto">

          <div className="col-6 mx-auto fixed-bottom">
            <div className='border rounded p-3 my-4'>

              <div className="mb-3">

                <select className="form-control" name='airconditionservice' onChange={ServiceChange}>
                  <option value="0" >Válasszon szolgáltatást</option>
                  <option value="2" >Klímatöltés</option>
                  <option value="2" >Hibafeltárás</option>
                  <option value="4" >Komplett klímaszerviz</option>
                  <option value="0" >Mégsem kérem</option>
                </select>

              </div>
              <Appointment selectedCar={selectedCar} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Airconditioner
