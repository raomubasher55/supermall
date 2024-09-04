import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export default function MerchantCenter() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden p-5">
      <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>

        <h1>MERCHANT CENTER</h1>

        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>

      <div className="container mx-auto px-2 lg:px-6 xl:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Merchant Details</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Partner with Us</h3>
            <p>
              Join our investment platform as a merchant and expand your business opportunities. Here’s how to participate:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Register: Create an account or log in if you already have one.</li>
              <li>Apply: Navigate to the Merchant section and fill out the application form.</li>
              <li>Review: Our team will review your application and contact you for further details.</li>
              <li>Approval: Once approved, you can start offering your investment products on our platform.</li>
            </ol>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Benefits of Partnering with Us</h3>
            <p>
              Discover the benefits of becoming a merchant on our platform:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access to a large pool of potential investors interested in diverse investment opportunities.</li>
              <li>Increase visibility and credibility for your investment products.</li>
              <li>Utilize our secure and efficient payment processing system.</li>
              <li>Receive dedicated support to help you manage and grow your offerings.</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Managing Your Investments</h3>
            <p>
              Easily manage your investment offerings and track performance:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access the Merchant Dashboard to monitor investor interest and transactions.</li>
              <li>Update your investment plans and terms as needed.</li>
              <li>Receive detailed reports on investment performance and earnings.</li>
              <li>Engage with investors through our communication channels.</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Support and Assistance</h3>
            <p>
              Our support team is here to assist you throughout your partnership journey:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Get help with technical integration and setup.</li>
              <li>Receive guidance on optimizing your investment offerings for our platform.</li>
              <li>Contact us for any questions or issues you encounter.</li>
              <li>Access resources and training materials to enhance your experience.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
