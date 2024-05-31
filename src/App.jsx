import AllCampaigns from "./Components/AllCampaigns";
import Overview from "./Components/Overview";
import NewCampaign from "./Components/NewCampaign";
import { Route, Routes } from 'react-router-dom';
import CampaignInfo from "./Components/CampaignInfo";


function App() {
  return (
    <>
      
        
         <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/allcampaigns' element={<AllCampaigns />} />
            <Route path='/newcampaign' element={<NewCampaign />} />
            <Route path='/campaigninfo' element={<CampaignInfo />} />



         </Routes>
        
      
    
    </>
  );
}

export default App;
