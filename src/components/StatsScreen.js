import './StatsScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

const StatsScreen = () => {

  const state = useSelector(state => state.main)
  const dispatch = useDispatch()
  const csvResults = state.csvResults
  const [isHiding, setIsHiding] = useState(false);

  return (
    <div className="stats_screen">
      
    </div>
  );
}

export default StatsScreen;
