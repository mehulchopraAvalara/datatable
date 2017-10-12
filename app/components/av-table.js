import Ember from 'ember';

export default Ember.Component.extend({

  sortOrder: {},

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('_columnsMap', JSON.parse(JSON.stringify(this.get('columnsMap'))));
    const orderBy = this.get('tableParams.orderBy');
    if (orderBy) {
      const tokens = orderBy.split(',');
      tokens.forEach((token) => {
        const sortLabelOrder = token.split(':');
        const sortLabel = sortLabelOrder[0];
        const order = sortLabelOrder[1];

        const obj = this.get('_columnsMap').findBy('sortLabel', sortLabel);
        if (obj) {
          obj.sortOrder = order;
        }
      });
    }
  },

  actions: {
    onColumnSelect(sortLabel, order) {
      const sortOrder = this.get('sortOrder');

      if (order === null) {
        delete sortOrder[sortLabel];
      } else {
        sortOrder[sortLabel] = `${sortLabel}:${order}`;
      }

      this.get('tableParams.onParamChanged').call(this.get('tableParams.context'), 'orderBy',
        Object.values(sortOrder).join(','));
    },

    onSkipChanged(skip) {
      this.set('skip', skip);
      this.get('tableParams.onParamChanged').call(this.get('tableParams.context'), 'skip', skip);
    },
  },
});
