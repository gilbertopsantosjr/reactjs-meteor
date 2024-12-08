import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Communities } from '../../communities/communities';

export const Event = ({ selectedEvent, onEventChange }) => {
  // Fetch the event names from the 'communities' collection
  const { events, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('allCommunitiess');
    return {
      events: Communities.find().fetch(),
      isLoading: !handle.ready(),
    };
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mb-6">
      <label className="mb-2 block font-bold text-gray-700" htmlFor="event">
        Select Event
      </label>
      <select
        id="event"
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        value={selectedEvent}
        onChange={(e) => onEventChange(e.target.value)}
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event.name} value={event.name}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};
