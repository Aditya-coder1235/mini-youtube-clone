import React from 'react'

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-20 text-red-500'>
        <h1 className='text-3xl font-bold'>You Looking for page is not Available</h1>
        <br />
        <p className='text-2xl font-semibold'>Go to Back <a href="/" className='text-blue-600 underline'>Home.</a></p>
    </div>
  )
}

export default ErrorPage