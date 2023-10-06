import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Workday = ({ yearNow, monthNow, dayNow, dayName, hourNow, minuteNow }) => {

    const nav = useNavigate();
    const selectedcar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));
    const numberPlate = selectedcar && selectedcar.plate_number;
    const serviceCookie = Cookie.get('service') && JSON.parse(Cookie.get('service'));
    const [serviceTimeAll, setServiceTimeAll] = useState(0);
    let serviceDate = '';

    useEffect(() => {
        let currentValue = 0;
        serviceCookie && Object.values(serviceCookie).map((value, index) => {
            currentValue += parseInt(value);
        })
        setServiceTimeAll(currentValue);
    }, [])

    console.log(serviceTimeAll);
    console.log(serviceCookie);

    const workTime = [
        '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30',
        '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15',
        '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00',
        '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30',
        '16:45'
    ]

    const reserve = (e) => {

        const nextSibling = '.nextSibling';
        let eTarget01 = 'e.target.parentNode.parentNode';
        const disabled = '.setAttribute("disabled", "disabled")'
        const red = '.setAttribute("class", "btn btn-sm btn-danger w-100")'
        const innerText = '.innerText = numberPlate';
        const eTarget02 = '.firstChild.firstChild';
        serviceDate = e.target.name;

        if (serviceTimeAll === 0) { console.log('Hiba') } else {

            e.target.setAttribute("disabled", "disabled");
            e.target.setAttribute("class", "btn btn-sm btn-danger w-100");
            e.target.innerText = numberPlate;

            if (serviceTimeAll > 1) {
                for (let i = 1; i < serviceTimeAll; i++) {

                    eTarget01 += nextSibling;
                    eval(eTarget01 + eTarget02 + disabled);
                    eval(eTarget01 + eTarget02 + red);
                    eval((eTarget01 + eTarget02) + innerText);
                }

                setServiceTimeAll(0);

                Cookie.set('service', JSON.stringify({
                    oilchange: 0,
                    tireservice: 0,
                    brakeservice: 0,
                    airconditionservice: 0,
                    carwash: 0
                }));

            }

            const serviceReverse = {
                plate_number: numberPlate,
                serviceTime: serviceTimeAll,
                serviceDate: serviceDate
            }
            console.log(serviceReverse);
        }

        /* nav('/') */
    }

    return (
        <div>

            <table className='table table-sm table-striped table-bordered text-center maxw140'>

                <thead>
                    <tr>
                        <th scope="col" className='p-2'><h5>{dayNow}</h5><h5>{dayName}</h5></th>
                    </tr>
                </thead>

                <tbody name={dayNow}>
                    {
                        workTime.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='p-1'>
                                        <button className='btn btn-sm w-100'
                                            name={dayNow + ' ' + item}
                                            id={dayNow + ' ' + item}
                                            type='button'
                                            onClick={reserve}
                                        >
                                            {item}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Workday
