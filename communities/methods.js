import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Communities } from './communities';

export async function create(data) {
  return Communities.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return Communities.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return Communities.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return Communities.findOneAsync(_id);
}

Meteor.methods({
  'Communities.create': create,
  'Communities.update': update,
  'Communities.remove': remove,
  'Communities.find': findById,
});
