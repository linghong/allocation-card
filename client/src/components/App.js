import React from 'react';
import AllocationStrategies from './AllocationStrategies';
import AllocationMain from './AllocationMain';

import './App.css';

function App () {
  return (
    <div className="card">
      <header className="card-header">
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
