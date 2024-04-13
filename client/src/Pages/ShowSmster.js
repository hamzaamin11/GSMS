import React from 'react'

const ShowSmster = ({visible}) => {
    if(!visible) return null
  return (
    <div className='fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm'>ShowSmster</div>
  )
}

export default ShowSmster