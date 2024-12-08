import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { People } from '../../people/people';
import { Modal } from './Modal';

export const RegisteredPeople = ({ eventName }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [reload, setReload] = useState(0);

  const { people, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('allPeoples');
    return {
      people: People.find().fetch(),
      isLoading: !handle.ready(),
    };
  }, [reload]);

  const handleReload = () => {
    // Change the `reload` state to force update the subscription
    setReload((prev) => prev + 1); // This will trigger re-subscription
  };

  const handleCheckIn = async (attendee) => {
    try {
      const newObject = {
        ...attendee,
        checkIn: new Date().toLocaleDateString(),
        eventName,
      };
      const response = await Meteor.callAsync(
        'People.update',
        attendee._id,
        newObject
      );
      if (response) {
        handleReload();
      }
    } catch (error) {
      if (error instanceof Meteor.Error) {
        console.error('Meteor error:', error.reason); // Handle known Meteor errors
        setErrorMessage(error.reason);
      } else {
        console.error('Unexpected error:', error.message); // Handle unexpected errors
        setErrorMessage(error.message);
      }
    }
  };

  const handleCheckOut = async (attendee) => {
    try {
      const newObject = {
        ...attendee,
        checkOut: new Date().toLocaleDateString(),
        eventName,
      };
      const response = await Meteor.callAsync(
        'People.update',
        attendee._id,
        newObject
      );
      if (response) {
        handleReload();
      }
    } catch (error) {
      if (error instanceof Meteor.Error) {
        console.error('Meteor error:', error.reason); // Handle known Meteor errors
        setErrorMessage(error.reason);
      } else {
        console.error('Unexpected error:', error.message); // Handle unexpected errors
        setErrorMessage(error.message);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 p-4">
        <Modal
          message={errorMessage}
          onClose={() => setErrorMessage(undefined)}
        />
      </div>
      <table className="min-w-full rounded-lg bg-white shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Full Name</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Title</th>
            <th className="w-1/6 p-4 text-left">Check-In Date</th>
            <th className="w-1/6 p-4 text-left">Check-Out Date</th>
            <th className="w-1/6 p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((attendee) => (
            <tr key={attendee._id} className="border-t">
              <td className="p-4">{`${attendee.firstName} ${attendee.lastName}`}</td>
              <td className="p-4">{attendee.companyName}</td>
              <td className="p-4">{attendee.title}</td>
              <td className="p-4">{attendee.checkIn || 'N/A'}</td>
              <td className="p-4">{attendee.checkOut || 'N/A'}</td>
              <td className="p-4">
                <button
                  className="w-full rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  onClick={() => handleCheckIn(attendee)}
                >
                  Check-in {attendee.firstName}
                </button>

                <button
                  className={`mt-4 ${
                    attendee.checkIn ? 'opacity-100' : 'opacity-0'
                  } w-full rounded-lg bg-red-500 px-5 py-2 font-semibold text-white shadow-md transition-opacity duration-5000 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2`}
                  onClick={() => handleCheckOut(attendee)}
                >
                  Check-out {attendee.firstName}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
