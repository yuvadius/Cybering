import React from 'react';
import Radar from './Radar.jsx';
import Location from './Location.jsx';

export default () => {
    return <div className="aside">
        <Radar />
        <Location />
    </div>;
}