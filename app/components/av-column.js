import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'th',

  nosort: true,

  actions: {
    onNoSort() {
      this.set('ascending', true);
      this.set('nosort', false);

      this.get('onSelect')('asc');
    },

    onAscending() {
      this.set('ascending', false);
      this.set('descending', true);

      this.get('onSelect')('desc');
    },

    onDescending() {
      this.set('descending', false);
      this.set('nosort', true);

      this.get('onSelect')(null);
    },
  },
});
