import React from 'react'

const ErrorMsg = ({ result, field }) => {
    return (
        <div>
            {
                (result.status === 'error' && result.errors[field]) && <span className='text-danger'>{result.errors[field]}</span>
            }
        </div>
    )
}

export default ErrorMsg
