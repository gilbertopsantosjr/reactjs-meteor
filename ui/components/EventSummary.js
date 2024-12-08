import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { People } from '../../people/people';

export const EventSummary = ({ eventName }) => {
  const { attendees, attendeeCount, notCheckedInCount, isLoading } =
    useTracker(() => {
      const handle = Meteor.subscribe('allPeoples');
      const _attendees = People.find().fetch();
      const _attendeeCount = _attendees.filter(
        (a) => a.checkIn && a.eventName === eventName
      ).length;
      const _notCheckedInCount =
        _attendees.filter((a) => !a.checkIn).length - _attendeeCount;

      const _companyBreakdown = Object.entries(
        _attendees.reduce((acc, attendee) => {
          if (
            attendee.checkIn &&
            attendee.eventName === eventName &&
            eventName !== ''
          ) {
            acc[attendee.companyName ? attendee.companyName : 'N/A'] =
              (acc[attendee.companyName ? attendee.companyName : 'N/A'] || 0) +
              1;
          }
          return acc;
        }, {})
      ).map(([name, count]) => ({ name, count }));

      return {
        attendees: _companyBreakdown,
        attendeeCount: _attendeeCount,
        notCheckedInCount: _notCheckedInCount,
        isLoading: !handle.ready(),
      };
    }, [eventName]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!eventName) {
    return <div />;
  }

  return (
    <div className="mt-6 rounded-lg bg-gray-100 p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold">{eventName} Event Summary</h2>
      <p className="mb-2">
        Current Attendee Count:
        <span className="font-semibold">{attendeeCount}</span>
      </p>
      <p className="mb-2">
        Not Checked In:
        <span className="font-semibold">{notCheckedInCount}</span>
      </p>
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Company Breakdown:</h3>
        <ul className="ml-6 list-disc">
          {attendees.map((a) => (
            <li key={a.name}>
              {a.name} <b>{a.count}</b> attendee(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
