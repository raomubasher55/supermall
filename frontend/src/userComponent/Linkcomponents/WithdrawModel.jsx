import React from 'react'
import { Link } from 'react-router-dom'

const WithdrawModel = ({ isModalVisible }) => {
    const startingDate = new Date();
    const endDate = new Date();
    endDate.setDate(startingDate.getDate() + 7);
  
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    return (
        <>
            {isModalVisible && (
                <div className="min-h-screen flex flex-col absolute items-center justify-center bg-background text-foreground">
                    <div className="bg-card p-6 rounded-lg shadow-lg text-center bg-white">
                        <img src="data:image/png;base64,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" alt="success-checkmark" className="mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                        <p className="text-muted-foreground mb-6">
                            You received your payment from {formatDate(startingDate)} to {formatDate(endDate)}.
                        </p>
                        <Link to={'/home'} className="bg-green-600 py-2 px-4 rounded-md text-white" >Home</Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default WithdrawModel
