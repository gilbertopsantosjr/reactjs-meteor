import { Meteor } from 'meteor/meteor';
import { Communities } from './communities';

Meteor.publish('allCommunitiess', () => Communities.find({}));
