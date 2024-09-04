import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const InviteReward = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden p-5">
      <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>

        <h1>INVITATION REWARDS</h1>

        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>

      <div className="container mx-auto px-2 lg:px-6 xl:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Invitation Rewards</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">How It Works</h3>
            <p>
              Earn rewards by inviting friends and family to join our investment platform. Here’s how it works:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Get Your Unique Referral Link: Find your personalized referral link in your account settings.</li>
              <li>Share Your Link: Invite others to join using your link through social media, email, or messaging apps.</li>
              <li>Receive Rewards: Earn rewards when your referrals sign up and make their first investment.</li>
              <li>Track Your Rewards: Monitor your rewards and earnings through your account dashboard.</li>
            </ol>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Benefits of Inviting Others</h3>
            <p>
              Enjoy the benefits of inviting others to our platform:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Receive a bonus for each successful referral who joins and invests.</li>
              <li>Help friends and family discover profitable investment opportunities.</li>
              <li>Build a network of investors and earn ongoing rewards.</li>
              <li>Use your rewards to reinvest or withdraw as cash.</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <p>
              Familiarize yourself with our invitation rewards program terms and conditions:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Rewards are credited once the referred user successfully completes their first investment.</li>
              <li>There is no limit to the number of referrals you can make.</li>
              <li>Rewards may vary based on the investment amount of the referred user.</li>
              <li>We reserve the right to modify or terminate the program at any time.</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Support and Assistance</h3>
            <p>
              Need help with our invitation rewards program? Contact our support team for assistance:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Visit our support page and submit a ticket for inquiries.</li>
              <li>Use our live chat feature for instant support.</li>
              <li>Check our FAQ section for common questions and answers.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteReward;
