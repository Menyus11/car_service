import React from 'react'
import Cookie from 'js-cookie'
import ServiceChange from '../ServiceChange';
import NavbarUser from '../layouts/NavbarUser';
import Appointment from '../Appointment';

const Carwash = () => {

  const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center'>Autómosó</h1>
      <div className="col-12">

        <div className="col-6 mx-auto">

          <div className="col-6 mx-auto fixed-bottom">
            <div className='border rounded p-3 my-4'>

              <div className="mb-3">

                <select className="form-control" name='carwash' onChange={ServiceChange}>
                  <option value="0" >Válasszon szolgáltatást</option>
                  <option value="1" >Külső mosás</option>
                  <option value="2" >Belső tisztítás</option>
                  <option value="4" >Komplett kozmetika</option>
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

export default Carwash
