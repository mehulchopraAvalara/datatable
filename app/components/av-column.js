import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'th',

  nosort: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('ascending', false);
    this.set('descending', false);
    this.set('nosort', false);

    const sortOrder = this.get('sortOrder');
    if (Ember.isEqual(sortOrder, 'asc')) {
      this.set('ascending', true);
    } else if (Ember.isEqual(sortOrder, 'desc')) {
      this.set('descending', true);
    } else {
      this.set('nosort', true);
    }
  },

  actions: {
    onNoSort() {
      this.get('onSelect')(this.get('sortLabel'), 'asc');
    },

    onAscending() {
      this.get('onSelect')(this.get('sortLabel'), 'desc');
    },

    onDescending() {
      this.get('onSelect')(this.get('sortLabel'), null);
    },
  },
});
