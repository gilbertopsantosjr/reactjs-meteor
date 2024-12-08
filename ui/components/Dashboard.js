import React, { useState } from 'react';
import { Event } from './Event';
import { EventSummary } from './EventSummary';
import { RegisteredPeople } from './RegisteredPeople';

export const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState();
  // Handle event change from DropdownMenu
  const handleEventChange = (event) => {
    setSelectedEvent(event);
  };
  return (
    <div className="p-100">
      <div className="text-xl font-bold"> Gilberto Santos's code challenge</div>
      <Event selectedEvent={selectedEvent} onEventChange={handleEventChange} />
      <hr />
      <EventSummary eventName={selectedEvent} />
      <hr />
      <RegisteredPeople eventName={selectedEvent} />
    </div>
  );
};
