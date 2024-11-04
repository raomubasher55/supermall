import React from 'react'

const InfoCard = ({ title, value }) => {
  return (
    <>
       <div className="bg-gray-100 p-3 rounded-lg">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
    </>
  )
}

export default InfoCard
