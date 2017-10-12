import Ember from 'ember';

export default Ember.Mixin.create({

  queryParams: ['orderBy', 'skip'],
  orderBy: '',
  skip: 0,

  tableParams: Ember.computed('orderBy', 'skip', function () {
    return {
      orderBy: this.get('orderBy'),
      skip: this.get('skip'),
      onParamChanged: this.onParamChanged,
      context: this,
    };
  }),

  onParamChanged(param, value) {
    this.set(param, value);
  },
});
