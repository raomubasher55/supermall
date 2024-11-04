import React from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { MessageCircle, DollarSign, UserPlus } from "lucide-react";
import NotificationItem from './NotificationItem/NotificationItem';
import { MdNotificationsActive } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Notify() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="text-center relative">
          <div className="fixed left-0 top-0 w-full h-[55px] bg-color text-white flex justify-between items-center px-4 text-xl z-10">
            <div onClick={() => navigate(-1)}>
              <SlArrowLeft className="cursor-pointer" />
            </div>
            <h1 className="text-lg">System Message</h1>
            <Link to="/notify">
              <MdNotificationsActive className="cursor-pointer" />
            </Link>
          </div>
          
            <div className="w-48 h-48 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="black" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="5" fill="black" />
              </svg>
            </div>
          </div>

          {/* System Announcement */}
          <div>
            <h3 className="text-lg font-semibold mb-2">system announcement</h3>
            <div className="space-y-4">
              <NotificationItem
                icon={<MessageCircle className="w-6 h-6" />}
                title="New message from Alex"
                message="Hey, can you help me with the presentation?"
                time="2 min ago"
              />
              <NotificationItem
                icon={<DollarSign className="w-6 h-6" />}
                title="Payment received"
                message="You've received ₹200 from John Doe"
                time="5 min ago"
              />
              <NotificationItem
                icon={<UserPlus className="w-6 h-6" />}
                title="New friend request"
                message="Jane Doe wants to connect with you"
                time="10 min ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
