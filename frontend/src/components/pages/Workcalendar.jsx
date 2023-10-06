import React from 'react'
import Workday from '../layouts/Workday'
import NavbarUser from '../layouts/NavbarUser';

const Workcalendar = () => {

  function getDayName(date = new Date(), locale = 'hu-HU') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  const today = new Date();
  const todayData = new Date();

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  const yearNow = today.getFullYear();
  const monthNow = today.getMonth() + 1;
  const dayNow = today.getDate();
  const hourNow = today.getHours();
  const minuteNow = today.getMinutes();
  const dayName = getDayName();

  return (
    <div>
      <NavbarUser />
      <h1 className='text-center'>Időpont foglalás</h1>

      <div className="container">
        <div className="row">

          <div className="col py-3 px-0">
            <Workday
              dayNow={
                yearNow
                + '.' +
                (monthNow < 10 ? '0' + monthNow : monthNow)
                + '.' +
                (dayNow < 10 ? '0' + dayNow : dayNow)
              }
              dayName={dayName}
            />
          </div>

          {days.map((day, index) => {
            const tomorrow = (new Date(todayData.setDate(todayData.getDate() + 1)));
            return (
              getDayName(tomorrow) !== 'szombat' && getDayName(tomorrow) !== 'vasárnap' &&

              <div className="col py-3 px-0" key={index}>

                <Workday
                  dayNow={tomorrow.getFullYear()
                    + '.' +
                    ((tomorrow.getMonth() + 1) < 10 ? '0' + (tomorrow.getMonth() + 1) : (tomorrow.getMonth() + 1))
                    + '.' +
                    (tomorrow.getDate() < 10 ? '0' + tomorrow.getDate() : tomorrow.getDate())}
                  dayName={getDayName(tomorrow)}
                />

              </div>
            )

          })}

        </div>
      </div>

    </div>

  )
}

export default Workcalendar
