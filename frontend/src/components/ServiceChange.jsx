import React from 'react'
import Cookie from 'js-cookie'
  
  const ServiceChange = (e) => {
    const serviceCookie = Cookie.get('service') && JSON.parse(Cookie.get('service'));
    let serviceNow = ({...serviceCookie, [e.target.name]: e.target.value});
     Cookie.set('service', JSON.stringify(serviceNow));
  }
  
  export default ServiceChange
  