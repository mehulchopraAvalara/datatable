import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('av-pagination-ctrl', 'Integration | Component | av pagination ctrl', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{av-pagination-ctrl}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#av-pagination-ctrl}}
      template block text
    {{/av-pagination-ctrl}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
