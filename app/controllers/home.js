import Ember from 'ember';

const defaultOrderBy = 'Title:asc';

export default Ember.Controller.extend({
  queryParams: ['orderBy', 'skip'],
  orderBy: defaultOrderBy,
  skip: 0,
  columns: ['Title', 'Pages', 'Price'],
  fields: ['title', 'pages', 'price'],
  sortableColumns: ['Pages', 'Price'],

  actions: {
    onParamChanged(param, value) {
      this.set(param, value);
      console.log('onParamChanged', param, value);
    },
  },
});
