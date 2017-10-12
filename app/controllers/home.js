import Ember from 'ember';
import AvTableController from '../mixins/av-table-controller';

export default Ember.Controller.extend(AvTableController, {

  columnsMap: [
    {
      label: 'Title',
      sortable: false,
    },
    {
      label: 'Pages',
      sortable: true,
      sortLabel: 'pages',
    },
    {
      label: 'Price',
      sortable: true,
      sortLabel: 'price',
    },
  ],
});
