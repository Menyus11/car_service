import React from 'react'
import NavbarUser from '../layouts/NavbarUser'
import Cookie from 'js-cookie'
import ServiceChange from '../ServiceChange'
import Appointment from '../Appointment'

const Oilchange = () => {

  const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center py-3'>Olajcsere</h1>
      <div className="container">
        <div className="col-12">

          <p>
            Sokan úgy vélik, hogy az olajcsere otthon is elvégezhető szerviz feladat. A szakszerű olajcsere nagy tapasztalatot igényel,
            így érdemes a szakemberekre bízni! Gyakori problémák az otthoni olajcsere esetén:
          </p>

          <ul>
            <li>
              a motortérben marad fáradt olaj szennyezés,
            </li>
            <li>
              nem megfelelő olajszint kiválasztása,
            </li>
            <li>
              a szűrő csere elhanyagolása,
            </li>
            <li>
              a fáradt olajjal keveredik az új olaj (de ez abban az esetben is így van, ha szervizkörülmények között zajlik a folyamat –
              mindig marad egy kevés fáradt olaj a motorban),
            </li>
            <li>
              nem a gyártói instrukcióknak megfelelő minőségű olaj használata.
            </li>
          </ul>

          <p>
            További probléma az otthon végzett olajcserével a környezetvédelmi kritériumoknak való megfelelés.
            A fáradt olaj tárolására és megsemmisítésére vonatkozó törvényi szabályozás szigorú.
            A nem megfelelően tárolt, talajvízbe szivárgó fáradt olaj jelentős ökológiai károkat okozhat.
            Ezért az olajcserét végző szakszervizek speciális környezetvédelmi feltételek szerint üzemelnek.
            Az otthon végzett olajcsere esetén nem megfelelően megsemmisített fáradt olaj akár súlyos, több százezer forintos büntetést is vonhat maga után.
          </p>

          <div className="col-6 mx-auto fixed-bottom">
            <div className='border rounded p-3 my-4'>
              <div className="mb-3">

                <select className="form-control" name='oilchange' onChange={ServiceChange}>
                  <option value="0" >Válasszon szolgáltatást</option>
                  <option value="2" >Olajcsere</option>
                  <option value="4" >Olaj és szürők cseréje</option>
                  <option value="5" >Komplett olaj és szűrőcsere diagnosztikával</option>
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

export default Oilchange
