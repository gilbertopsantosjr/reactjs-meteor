import { Meteor } from 'meteor/meteor';
import { People } from './people';

Meteor.publish('allPeoples', () => People.find({}));
