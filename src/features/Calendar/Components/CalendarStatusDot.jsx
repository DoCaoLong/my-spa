import React, { useEffect, useState } from 'react';
import DotItem from './DotItem';

function CalendarStatusDot(props) {
      const { i, thisMonth, thisYear, dots } = props;
      const [arrayDot, setArrayDot] = useState([]);
      useEffect(() => {
            let newdate = [
                  i <= 8 ? `0${i + 1}` : `${i + 1}`,
                  (thisMonth + 1) < 10 ? `0${thisMonth + 1}` : `${thisMonth + 1}`,
                  `${thisYear}`
            ].join("/");
            const datesttArray = dots.filter((dot) => dot.date === newdate);
            setArrayDot(datesttArray)
      }, [dots, i, thisMonth, thisYear])
      return (
            <div className="status-dots">
                  {arrayDot.map((dot, index) => (
                        <DotItem key={index} dotStatus={dot.status} />
                  ))}
            </div>
      );
}

export default CalendarStatusDot;