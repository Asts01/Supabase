import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTime = ({closeDateTimeModal}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
      <div>
        <div>
            <h2>Select Date and Time</h2>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy hh:mm:ss a"
          className="border p-2 rounded"
        />
        {selectedDate && <p>Selected Date: {selectedDate.toString()}</p>}
      </div>
    );
}

export default DateTime
