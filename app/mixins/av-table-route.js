import Ember from 'ember';

export default Ember.Mixin.create({

  queryParams: {
    orderBy: {
      refreshModel: true,
    },
    skip: {
      refreshModel: true,
    },
  },

  model(params) {
    this.set('tableParams', {
      orderBy: params.orderBy,
      skip: params.skip,
    });
  },

});
