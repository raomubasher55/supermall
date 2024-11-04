import React from 'react'

const NotificationItem = ({icon , title , message , time}) => {
  return (
    <div className="flex items-start space-x-3 border border-slate-400 rounded-lg p-2">
      <div className="bg-gray-200 p-2 rounded-full">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{message}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

export default NotificationItem
