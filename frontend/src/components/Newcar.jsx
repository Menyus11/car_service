import React from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie'
import ErrorMsg from './layouts/ErrorMsg'

const Newcar = () => {

    const [result, setResult] = useState('');

    const [data, setData] = useState({
        numberplate: '',
        brand: '',
        type: ''
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token')
        }, body: JSON.stringify(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/newcar', config)
            .then(res => res.json())
            .then(res => {
                setResult(res);
                window.location.reload()
            })
    }

    return (
        <div>
            <h3 className='text-center py-3'>Új jármű regisztrálása</h3>
            <div className="container">

                <form className='col-6 mx-auto border rounded p-4' onSubmit={handleSubmit}>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="plate_number" name='plate_number' placeholder="plate_number" onChange={handleChange} />
                        <label htmlFor="plate_number">Rendszám</label>
                        <ErrorMsg result={result} field="plate_number" />
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="brand" name='brand' placeholder="brand" onChange={handleChange} />
                        <label htmlFor="brand">Márka</label>
                        <ErrorMsg result={result} field="brand" />
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="type" name='type' placeholder="type" onChange={handleChange} />
                        <label htmlFor="type">Típus</label>
                        <ErrorMsg result={result} field="type" />
                    </div>

                    <div>
                        <button className='btn btn-outline-success form-control m-3 mx-auto'>Mentés</button>
                    </div>

                    {result.status === 'success' && <div className="alert alert-success text-center">{result.message}</div>}
                    {result.status === 'error' && <div className="alert alert-danger text-center">{result.message}</div>}

                </form>

            </div>
        </div>
    )
}

export default Newcar
