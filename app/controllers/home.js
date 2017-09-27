import Ember from 'ember';

export default Ember.Controller.extend({

  columns: ['Title', 'Pages', 'Price'],
  fields: ['title', 'pages', 'price'],
});
