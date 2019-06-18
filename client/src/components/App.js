import React from 'react';
import AllocationStrategies from './AllocationAside';
import AllocationMain from './AllocationMain';
import { primaryColor } from '../utils';

import './App.css';

function App () {
  return (
    <div className="card">
      <header className="card-header" style = {{ backgroundColor: primaryColor }}>
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
