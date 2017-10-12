import Ember from 'ember';
import AvTableControllerMixin from 'datatable/mixins/av-table-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | av table controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let AvTableControllerObject = Ember.Object.extend(AvTableControllerMixin);
  let subject = AvTableControllerObject.create();
  assert.ok(subject);
});
