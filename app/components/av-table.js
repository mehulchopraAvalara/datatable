import Ember from 'ember';

export default Ember.Component.extend({

  sortOrder: {},

  didReceiveAttrs() {
    this.set('tableData', this.get('data'));

    // must come from caller
    this.set('skip', 0);
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

      this.get('onParamChanged')('orderBy', `${column}:${order}`);

      this.get('onDataLoad')(Object.values(sortOrder).join(','), this.get('skip'),
        this.get('rowsPerPage'))
        .then((data) => {
          _this.set('tableData', data);
        });
    },

    onSkipChanged(skip) {
      this.set('skip', skip);
      const _this = this;

     this.get('onParamChanged')('skip', skip);

     this.get('onDataLoad')(Object.values(this.get('sortOrder')).join(','), this.get('skip'),
        this.get('rowsPerPage'))
        .then((data) => {
          _this.set('tableData', data);
        });
    },
  },
});
