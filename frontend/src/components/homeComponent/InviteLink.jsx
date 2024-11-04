import React, { useState } from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { ArrowLeft, Copy, User } from "lucide-react"
import { Link , useNavigate } from 'react-router-dom';
import inviteImg from '/src/assets/inv-1.png'


export default function InviteLink() {

  const [copied, setCopied] = useState(false)
  const referralCode = "QWERTY1234"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden">
 <div className="fixed left-0 top-0 w-full h-[55px] bg-color text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className="text-[17px] font-medium">INVITAION</h1>
        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>

     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* <div className="bg-red-500 text-white p-4 flex items-center">
          <ArrowLeft className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-bold">INVITATION REWARD</h1>
        </div> */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Your Referral Code</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-grow border rounded-l-lg px-3 py-2 text-lg font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-lg transition-colors duration-200"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Invite Friends</h2>
            <div className="flex space-x-4">
              <div className="flex-1 border border-red-300 rounded-lg p-4 text-center">
                <User className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="font-semibold">You</p>
                <p className="text-sm text-gray-600">Get $5-$1000</p>
              </div>
              <div className="flex-1 border border-red-300 rounded-lg p-4 text-center">
                <User className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="font-semibold">Friend</p>
                <p className="text-sm text-gray-600">Get $5-$1000</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            You'll both get rewards when your friends make a successful deposit.
          </p>
          <button className="w-full bg-color hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors duration-200">
            Start Sharing
          </button>
        </div>
      </div>
    </div>

      
    </div>
  )
}
