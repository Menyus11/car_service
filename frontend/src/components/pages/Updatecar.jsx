import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import NavbarUser from '../layouts/NavbarUser'
import ErrorMsg from '../layouts/ErrorMsg'

const Updatecar = () => {

    const updatecarnow = JSON.parse(Cookie.get('updatecarnow'));

    const [data, setData] = useState({
        id: updatecarnow.id,
        plate_number: updatecarnow.plate_number,
        brand: updatecarnow.brand,
        type: updatecarnow.type
    });

    const [result, setResult] = useState('');
    const token = Cookie.get('token');
    const nav = useNavigate();

    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value })
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
        fetch('http://localhost:8000/api/updatecar', config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {

                    setResult(res);
                    setTimeout(() => {
                        Cookie.remove('updatecarnow');
                        nav('/vehicles');
                    }, 2000);

                } else {
                    setResult(res);
                }

            })
    }

    return (
        <div>
            <NavbarUser />
            <h1 className='text-center py-3'>Jármű módosítása</h1>
            <div className="container">
                <form className='col-6 mx-auto border rounded p-4' onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="plate_number" name='plate_number'
                            defaultValue={updatecarnow && updatecarnow.plate_number} onChange={handleChange} />
                        <label htmlFor="plate_number">Rendszám</label>
                        <ErrorMsg result={result} field="plate_number" />
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="brand" name='brand'
                            defaultValue={updatecarnow && updatecarnow.brand} onChange={handleChange} />
                        <label htmlFor="brand">Márka</label>
                        <ErrorMsg result={result} field="brand" />
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="type" name='type'
                            defaultValue={updatecarnow && updatecarnow.type} onChange={handleChange} />
                        <label htmlFor="type">Típus</label>
                        <ErrorMsg result={result} field="type" />
                    </div>

                    <button className="btn btn-outline-success my-4 form-control" type="submit">Módosítás</button>

                    {result && result.status === 'success' && <div className="alert alert-success text-center">{result.message}</div>}
                    {result && result.status === 'error' && <div className="alert alert-danger text-center">{result.message}</div>}



                </form>
            </div>

        </div>
    )
}

export default Updatecar
