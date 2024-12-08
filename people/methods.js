import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { People } from './people';

export async function create(data) {
  return People.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);

  if (!data.eventName) {
    throw new Meteor.Error(
      'invalid-update-object',
      'An event must be provided.'
    );
  }

  return People.updateAsync(_id, data);
}

export async function remove(_id) {
  check(_id, String);
  return People.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return People.findOneAsync(_id);
}

Meteor.methods({
  'People.create': create,
  'People.update': update,
  'People.remove': remove,
  'People.find': findById,
});
