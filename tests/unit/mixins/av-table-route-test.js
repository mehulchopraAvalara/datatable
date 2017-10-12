import Ember from 'ember';
import AvTableRouteMixin from 'datatable/mixins/av-table-route';
import { module, test } from 'qunit';

module('Unit | Mixin | av table route');

// Replace this with your real tests.
test('it works', function(assert) {
  let AvTableRouteObject = Ember.Object.extend(AvTableRouteMixin);
  let subject = AvTableRouteObject.create();
  assert.ok(subject);
});
