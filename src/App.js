import './App.css';
import LaureateOverview from './LaureateOverview';
import PrizeOverview from './PrizeOverview';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';


const App = () => {

  const [tab, setTab] = useState('PrizeOverview')

  const handleChange = (event, value) => {
    setTab(value)
  }

  return (
    <div className="App">
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label='Prize Overview' value='PrizeOverview'/>
        <Tab label='Find Laureate' value='FindLaureate'></Tab>
      </Tabs>
      {tab==='PrizeOverview' && <PrizeOverview/>}
      {tab==='FindLaureate' && <LaureateOverview/>}
    </div>
  );
}

export default App;
