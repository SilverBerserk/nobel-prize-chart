import './App.css';
// import LaureateOverview from './LaureateOverview';
import PrizeOverview from './PrizeOverview';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import { lazy, Suspense, useState } from 'react';
const LaureateOverview = lazy(() => import('./LaureateOverview'));


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
      <Suspense fallback={<CircularProgress/>}>
        {tab==='FindLaureate' && <LaureateOverview/>}
      </Suspense>
    </div>
  );
}

export default App;
