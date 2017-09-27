import Ember from 'ember';

export default Ember.Component.extend({

  sortOrder: {},

  didReceiveAttrs() {
    this.set('tableData', this.get('data'));
  },

  actions: {
    onColumnSelect(column, order) {
      const _this = this;
      const sortOrder = this.get('sortOrder');
      const field = this.get('fields')[this.get('columns').indexOf(column)];

      if (order === null) {
        delete sortOrder[column];
      } else {
        sortOrder[column] = `${field} ${order}`;
      }

      this.get('onDataLoad')(Object.values(sortOrder).join(','))
        .then((data) => {
          _this.set('tableData', data);
        });
    },
  },
});
