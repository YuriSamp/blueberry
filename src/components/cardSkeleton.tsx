import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="w-60 h-52 bg-white flex brutalism-box brutalism-box-hover">
      <div className="m-2 h-36 bg-gray-300 w-full rounded-lg animate-pulse" />
      <div className="flex justify-between absolute bottom-0 left-0 py-2 w-full px-3 rounded-b-md bg-gray-300 h-10 animate-pulse" />
    </div>
  )
}

export default CardSkeleton
