import  { useState } from 'react';
import Modal from './Modal'; // Import your Modal component here
import SideBar from './SideBar';
import NavBar from './NavBar';
import { FaArrowLeftLong } from 'react-icons/fa6';

// Your existing CampaignInfo component
const CampaignInfo = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <SideBar />
      <div>
        <NavBar />
        <div className="pl-40">
          <div className="flex items-center justify-start gap-4 mt-6">
            <FaArrowLeftLong className='cursor-pointer' />
            <p>Back</p>
          </div>
          <div className='flex items-center justify-between mr-56'>
            <h2 className="mt-6 text-buttonColor font-bold text-xl">Campaign Information</h2>
            <button className='bg-gray-300 p-1 rounded-sm mt-8' onClick={openModal}>Campaign Status | <span className='text-green-500'>Active</span></button>
          </div>
        </div>
      </div>

      {/* Render the modal conditionally */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {/* Your campaign information form goes here */}
          {/* Include all your form elements inside the Modal component */}
        </Modal>
      )}
    </div>
  );
};

export default CampaignInfo;
