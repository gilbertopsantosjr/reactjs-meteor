import { Meteor } from 'meteor/meteor';
import '../communities/publications';
import { loadInitialData } from '../infra/initial-data';
import '../people/methods';
import '../people/publications';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
