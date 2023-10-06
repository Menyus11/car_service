import React, { useEffect } from 'react'
import NavbarUser from '../layouts/NavbarUser'
import { useState } from 'react'
import ErrorMsg from '../layouts/ErrorMsg'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  useEffect(() => {
    setUser(JSON.parse(Cookie.get('user')));
    setData({
      name: JSON.parse(Cookie.get('user')).name,
      email: JSON.parse(Cookie.get('user')).email
    })
  }, [])

  const [data, setData] = useState({})
  const [result, setResult] = useState('');
  const nav = useNavigate();
  const token = Cookie.get('token');
  const [user, setUser] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value }),
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }, body: JSON.stringify(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/profileupdate', config)
      .then(res => res.json())
      .then(res => {
        setResult(res);
        if (res.status === 'success') {
          Cookie.set('user', JSON.stringify(user));
          setTimeout(() => {
            nav('/')
          }, 2000);
        }
      })
  }

  return (
    <div>
      <NavbarUser />
      <div className="container">
        <h1 className='text-center my-3'>Profilom</h1>
        <div className="col-6 mx-auto">
          <form action="" className='border rounded p-3' onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Név</label>
              <input type="name" className="form-control" id="name" name='name' aria-describedby="nameHelp" onChange={handleChange} defaultValue={user.name}/>
              <div id="nameHelp" className="form-text">A név 3-25 karakerből állhat!</div>
              <ErrorMsg result={result} field="name" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email cím</label>
              <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} defaultValue={user.email}/>
              <div id="emailHelp" className="form-text">Az email-cím valós, működő kell, hogy legyen!</div>
              <ErrorMsg result={result} field="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Jelszó</label>
              <input type="password" className="form-control" id="password" name='password' aria-describedby="passwordHelp" onChange={handleChange} />
              <div id="passwordHelp" className="form-text">Amennyiben a jelszót nem szeretné megváltoztatni, ezt a mezőt hagyja üresen!</div>
              <ErrorMsg result={result} field="password" />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-outline-success form-control">Profil frissítése</button>
            </div>

            {result.status === 'success' && <div className="alert alert-success text-center" role="alert">{result.message}</div>}

          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
