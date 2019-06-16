import React from 'react';
import AllocationMain from './AllocationMain';

import './App.css';

function App () {
  return (
    <div className="card">
      <header className="card-header">
        Allocation Strategy
      </header>
      <div className="card-content">
        <AllocationMain/>
      </div>
    </div>
  );
}

export default App;
