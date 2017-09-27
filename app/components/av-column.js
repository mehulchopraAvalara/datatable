import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'th',

  nosort: true,

  didReceiveAttrs() {
    this._super(...arguments);

    const column = this.get('column');
    const sortableColumns = this.get('sortableColumns');
    if (sortableColumns.contains(column)) {
      this.set('sortable', true);
    } else {
      this.set('sortable', false);
    }
  },

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
