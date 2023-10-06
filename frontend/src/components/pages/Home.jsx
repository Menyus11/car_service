import React, { useEffect } from 'react'
import NavbarGuest from '../layouts/NavbarGuest'
import NavbarUser from '../layouts/NavbarUser'
import Cookie from 'js-cookie'


const Home = () => {

  const token = Cookie.get('token');

  const serviceList = [
    { picture: '/public/pic/profile.png', alt: 'profil', header: 'Profilom', title: 'A profilodat tudod itt megtekinteni, módosítani.', url: '/profile' },
    { picture: '/public/pic/carfleet.png', alt: 'Járműveim', header: 'Járműveim', title: 'A jáműveidet tudod itt kiválasztani, kezelni.', url: '/vehicles' },
    { picture: '/public/pic/oilchange.png', alt: 'Olajcsere', header: 'Olajcsere', title: 'Itt olajcserére tudsz időpontot foglalni.', url: '/oilchange' },
    { picture: '/public/pic/tire3.png', alt: 'Gumiszerviz', header: 'Gumiszerviz', title: 'Itt gumicserére, javításra tudsz időpontot foglalni.', url: '/tirechange' },
    { picture: '/public/pic/brake.png', alt: 'Fékszerviz', header: 'Fékszerviz', title: 'Itt fékellenőrzésre, javításra tudsz időpontot foglalni.', url: '/brakechange' },
    { picture: '/public/pic/clima.png', alt: 'Klímaszerviz', header: 'Klímaszerviz', title: 'Itt klímatöltésre, javításra tudsz időpontot foglalni.', url: '/airconditioner' },
    { picture: '/public/pic/carwash.png', alt: 'Autómosó', header: 'Autómosó', title: 'Itt autómosásra, kozmetikára tudsz bejelentkezni.', url: '/carwash' },
  ]

  return (
    <div>

      {token ? <>
        <NavbarUser />
        <div className='container'>
          <div className="row p-4 d-flex justify-content-around">

            {serviceList.map((service, index) => {
              return (
                <div className="card m-2 p-2" style={{ width: "18rem" }} key={index}>
                  <img src={service.picture} className="card-img-top" alt={service.alt} />
                  <div className="card-body">
                    <h5 className="card-title">{service.header}</h5>
                    <p className="card-text">{service.title}</p>
                    <a href={service.url} className="btn btn-primary">Kiválasztom</a>
                  </div>
                </div>
              )
            })}

          </div>
        </div>

      </> : <>

        <NavbarGuest />
        <div className='container flex-direction: column'>
          <h2 className='text-center m-3'>Az autók szerelmeseinek...</h2>


        </div>

      </>}

    </div>
  )
}

export default Home
