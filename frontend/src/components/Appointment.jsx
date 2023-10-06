import React from 'react'
import { useNavigate } from 'react-router-dom'

const Appointment = (selectedCar) => {

    const nav = useNavigate();

    const handleClick = () => {
        nav('/calendar')
    }   

    return (
        <div className='text-center'>
            {selectedCar && <button className="btn btn-outline-success form-control" onClick={handleClick}>Időpontot foglalok</button>}
            {!selectedCar && <h5 className='text-danger'>Foglalás előtt vállassza ki a kívánt járművet!!!</h5>}
        </div>
    )
}

export default Appointment
