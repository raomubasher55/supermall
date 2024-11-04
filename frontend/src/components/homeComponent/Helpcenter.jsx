import React from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link , useNavigate } from 'react-router-dom';

export default function HelpCenter() {

  const navigate = useNavigate();
  const articles = [
    {
      title: "How do I get paid?",
      description: "Learn about the different ways you can receive money",
    },
    {
      title: "How do I add an income source?",
      description: "Add your employer or connect your bank account",
    },
    {
      title: "How do I set up direct deposit?",
      description: "Set up direct deposit with your employer",
    },
    {
      title: "What is a verified income source?",
      description: "Find out what it means to have a verified income source",
    },
    {
      title: "How do I verify my income source?",
      description: "Verify your income source by connecting your bank account",
    },
    {
      title: "How do I change my income source?",
      description: "Change your income source at any time",
    },
    {
      title: "How do I delete my income source?",
      description: "You can delete your income source at any time",
    },
  ]

  return (
<div className="flex flex-col items-center bg-white overflow-hidden ">
    <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
      <div onClick={() => navigate(-1)}>
        <SlArrowLeft className="cursor-pointer" />
      </div>
       
       <h1>HELP CENTER</h1>

      <Link to="/notify">
        <MdNotificationsActive className="cursor-pointer" />
      </Link>
    </div>

    <div className="flex justify-center items-center min-h-screen bg-red-100 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Popular Articles</h1>
          <div className="space-y-3">
            {articles.map((article, index) => (
              <div
                key={index}
                className="border border-pink-200 rounded-lg p-3 hover:bg-pink-50 transition-colors duration-200"
              >
                <h2 className="text-lg font-semibold text-red-500">{article.title}</h2>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
</div>
  )
}
