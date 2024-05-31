import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CampaignInfo = () => {
  const { id } = useParams();
  const [editCampaign, setEditCampaign] = useState({
    id: 0,
    campaignName: "",
    campaignDTO: "",
    startDate: "",
    endDate: "",
    digestCampaign: true,
    linkedKeywords: [""],
    dailyDigest: "",
    campaign: ""
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`);
        if (response.status === 200) {
          const data = response.data;
          data.digestCampaign = Boolean(data.digestCampaign);
          data.id = id;
          setEditCampaign(data);
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCampaign({
      ...editCampaign,
      [name]: value
    });
  };

  const handleDigestChange = (e) => {
    setEditCampaign({
      ...editCampaign,
      digestCampaign: e.target.value === "true"
    });
  };

  const handleKeywordsChange = (e) => {
    setEditCampaign({
      ...editCampaign,
      linkedKeywords: e.target.value.split(',').map(keyword => keyword.trim())
    });
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`, { ...editCampaign, linkedKeywords: editCampaign.linkedKeywords.filter(keyword => keyword) });

      if (response.status === 200) {
        console.log('Campaign updated successfully');
        alert('Saved successfully');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/allcampaigns');
  };

  return (
    <div className="flex">
      <SideBar />
      <div> 
        <NavBar />
        <div className="pl-40">
          <div className="flex items-center justify-start gap-4 mt-6">
            <FaArrowLeft onClick={handleReturn} className="cursor-pointer" />
            <p>Back</p>
          </div>
          <div className='flex items-center justify-between mr-56'>
            <h2 className="mt-6 text-buttonColor font-bold text-xl">Campaign Information</h2>
            <button className='bg-gray-300 p-1 rounded-sm mt-8'>
              Campaign Status | <span className='text-green-500'>Active</span>
            </button>
          </div>
          <div className="mt-6">
            <label>
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              name="campaignName"
              value={editCampaign.campaignName}
              onChange={handleChange}
              placeholder="e.g The Future is now"
              className="w-[684px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex mt-6 gap-24">
            <div className="gap-4">
              <label>
                Start date <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                type="date"
                name="startDate"
                value={editCampaign.startDate}
                onChange={handleChange}
                className="w-72 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="ml-4">
              <label>End date</label>
              <br />
              <input
                type="date"
                name="endDate"
                value={editCampaign.endDate}
                onChange={handleChange}
                className="w-72 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <label>
              Linked Keywords <span className="text-red-500">*</span>
            </label>
            <br />
            <textarea
              name="linkedKeywords"
              value={editCampaign.linkedKeywords.join(', ')}
              onChange={handleKeywordsChange}
              placeholder=""
              className="w-[684px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-6">
            <label>What to receive daily digest on Campaign</label>
            <br />
            <select
              name="digestCampaign"
              value={editCampaign.digestCampaign}
              onChange={handleDigestChange}
              className="border border-gray-400 rounded-md w-[684px] p-2"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="mt-6">
            <label>Kindly select how often you want to receive daily digest</label>
            <br />
            <select
              name="dailyDigest"
              value={editCampaign.dailyDigest}
              onChange={handleChange}
              className="border border-gray-400 rounded-md w-[684px] p-2"
            >
              <option value="Month">Month</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>
          <div className="mt-6">
            <label>
              Campaign ID <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              value={id}
              readOnly // Make it read-only as it's the ID
              className="w-[684px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4 ml-8">
            <div className="w-[196px] h-[40px] border mt-12 py-6 text-white text-xl bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white cursor-pointer">
              Stop Campaign
            </div>
            <button className="w-[196px] h-[40px] border mt-12 py-6 text-buttonColor border-buttonColor rounded-lg flex items-center justify-center text-xl hover:bg-buttonColor hover:text-white cursor-pointer" onClick={handleEdit}>Edit Information</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
