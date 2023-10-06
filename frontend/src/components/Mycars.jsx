import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Mycars = () => {

    const [cars, setCars] = useState([]);
    const [result, setResult] = useState('');
    const token = Cookie.get('token');
    const nav = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/getcars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    setCars(res.vehicles);
                } else {
                    setResult(res);
                }
            })
    }, [])

    const selectHandler = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/selectcar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }, body: JSON.stringify({ id: e.target.name })

        }).then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookie.set('selectedcar', JSON.stringify(res.vehicle));
                    Cookie.set('service', JSON.stringify({
                        oilchange: 0,
                        tireservice: 0,
                        brakeservice: 0,
                        airconditionservice: 0,
                        carwash: 0
                    }));
                    nav('/') 
                } else {
                    setResult(res);
                }
            })
    }

    const editHandler = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/selectcar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }, body: JSON.stringify({ id: e.target.name })

        }).then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookie.set('updatecarnow', JSON.stringify(res.vehicle));
                    nav('/updatecar')
                } else {
                    setResult(res);
                }
            })
    }

    const deleteHandler = (e) => {
        e.preventDefault();

        const currentId = e.target.name;

        fetch('http://localhost:8000/api/deletecar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }, body: JSON.stringify({ id: currentId })

        }).then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    setCars(res.vehicles);
                    window.location.reload()
                } else {
                    setResult(res);
                }
            })

    }

    return (
        <div>
            <h3 className='text-center py-3'>Járműveim:</h3>
            <div className="container">

                {cars && cars.map((car, index) => {
                    return (
                        <div className="list-group col-6 mx-auto" key={index}>

                            <div className="list-group-item list-group-item-action bg-warning-subtle mb-2">
                                <h5 className="mb-1">{car.plate_number}</h5>
                                <div className="d-flex w-100 justify-content-between">
                                    <p>{car.brand} {car.type}</p>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">

                                        <button type="button" className="btn btn-success" name={car.id} onClick={selectHandler} title='Kiválasztás'>
                                            <i className="fa-solid fa-car pointerEventsNone"></i>
                                        </button>

                                        <button type="button" className="btn btn-primary" name={car.id} onClick={editHandler} title='Szerkesztés'>
                                            <i className="fa-solid fa-pencil pointerEventsNone"></i>
                                        </button>

                                        <button type="button" className="btn btn-danger" name={car.id} onClick={deleteHandler} title='Törlés'>
                                            <i className="fa-regular fa-trash-can pointerEventsNone"></i>
                                        </button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                })}

                {result && result.status === 'error' && <p className='text-danger'>{result.message}</p>}

            </div>
        </div>
    )
}

export default Mycars
