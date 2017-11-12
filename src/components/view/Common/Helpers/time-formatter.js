import React from 'react';
import moment from 'moment';

const TimeFormatter = (props) => {

    const { time } = props;

    const timeStr = moment(time).calendar();

    return(
        <div>
            {timeStr}
        </div>
    );
    
}

export default TimeFormatter;