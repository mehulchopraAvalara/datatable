# datatable

## Route for the model data of the datatable

```javascript
import Ember from 'ember';
import AvTableRoute from '../mixins/av-table-route';

export default Ember.Route.extend(AvTableRoute, {
  model() {
    this._super(...arguments); //very imp! for the av-datatable magic to kick in
    const { orderBy, skip } = this.get('tableParams');
    const max = 3;

    //call backend service using orderBy and skip parameters to get the model data
    //orderBy is in format sortLabel1:asc,sortLabel2:desc
    //skip,  the skip parameter used for the pagination results
    return callDataService(orderBy, skip, max)
  },
});
```

## Controller for the corresponding route of the datatable

```javascript
import Ember from 'ember';
import AvTableController from '../mixins/av-table-controller';

export default Ember.Controller.extend(AvTableController, {

  //property with this name and data structure needed by the datatable
  columnsMap: [
    {
      label: 'Title', //the label of the column
      sortable: false, //this column will not support sorting
      classList: ['css-class1', 'css-class2']
    },
    {
      label: 'Pages', //the label of the column
      sortable: true, //this column supports sorting
      sortLabel: 'pages', //the sortLabel of this column that is listed in the orderBy tableParams in the model hook
    },
    {
      label: 'Price',
      sortable: true,
      sortLabel: 'price',
      classList: ['css-class3']
    },
  ],
  
  p1ClassList: ['pagination-ctrl'],
  c1ClassList: ['pagination-arrow'],
  c11ClassList: ['icon-left_arrow'],
  c2ClassList: ['pagination-list'],
  c3ClassList: ['pagination-arrow'],
  c31ClassList: ['icon-right_arrow'],
  tableClassList: ['cup-grid'],
});
```

## Template for the corresponding route of the datatable

```
{{#av-table
  columnsMap=columnsMap
  currentPageRecords=model.books {{!-- the records that need to be displayed --}}
  total=model.total {{!-- the count of the total records that exist --}}
  tableParams=tableParams {{!-- pass as it is for all the magic --}}
  recordsPerPage=3 {{!-- how many records per page --}}
  {{!-- below attributes are for the different areas generated in the pagination control. The name of the DOM element --}}
  {{!-- matches the below attribute names at the start. Useful for passing on custom styling to the pagination control --}}
  p1ClassList=p1ClassList
  c1ClassList=c1ClassList
  c11ClassList=c11ClassList
  c2ClassList=c2ClassList
  c3ClassList=c3ClassList
  c31ClassList=c31ClassList
  arrowDisabledClass='disabled'
  pageNumberActiveClass='active'
  tableClassList=tableClassList as |tableRow|}}
  <tr>
    <td>{{tableRow.title}}</td>
    <td>{{tableRow.pages}}</td>
    <td>{{tableRow.price}}</td>
  </tr>
{{/av-table}}
```
