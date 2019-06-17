import React from 'react';
import AllocationStrategies from './AllocationStrategies';
import AllocationMain from './AllocationMain';
import { bcakgroundPrimaryColor } from '../utils';

import './App.css';

function App () {
  return (
    <div className="card">
      <header className="card-header" style = {bcakgroundPrimaryColor}>
        Allocation Strategy
      </header>
      <div className="card-content">
        <aside className = "card-aside">
          <AllocationStrategies/>
        </aside>
        <AllocationMain/>
      </div>
    </div>
  );
}

export default App;
