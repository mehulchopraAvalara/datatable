import Ember from 'ember';

const books = [
  {
    id: 1,
    title: 'Book 1',
    pages: 100,
    price: 978,
  },
  {
    id: 2,
    title: 'Book 2',
    pages: 50,
    price: 1000,
  },
  {
    id: 3,
    title: 'Book 3',
    pages: 450,
    price: 900,
  },
  {
    id: 4,
    title: 'Book 4',
    pages: 900,
    price: 340,
  },
  {
    id: 5,
    title: 'Book 5',
    pages: 450,
    price: 300,
  },
];
export default Ember.Route.extend({

  queryParams: {
    orderBy: {
      refreshModel: true,
    },
    skip: {
      refreshModel: true,
    }
  },

  model(params) {
    console.log('model hook', params);
    return {
      total: books.length,
      books: books.slice(0, 3),
    };
  },

  actions: {
    onLoadBooks(sortOrder, skip, max) {

      // I dont understand this flow. I would expect data loading to be handled
      // via Ember query param and model hook.

      //Dont look at this logic.
      //A REST service would do all this for you and return the data
      //For POC purpose this is in memory order and paging happening
      return new Ember.RSVP.Promise(function(resolve) {
        if (sortOrder === '') {
          if (skip >= 0 && max >= 0) {
            resolve(books.slice(skip, skip + max));
          } else {
            resolve(books);
          }

          return;
        }

        const sortTokens = sortOrder.split(',');
        if (sortTokens.length > 0) {
          let sortedList = Object.assign([], books);
          if (sortTokens.length === 1) {
            const comp = sortTokens[0].split(' ');
            const field = comp[0];
            const order = comp[1];
            sortedList.sort((e1, e2) => {
              if (order === 'asc') {
                return e1[field] - e2[field];
              } else {
                return e2[field] - e1[field];
              }
            });

            if (skip >= 0 && max >= 0) {
              resolve(sortedList.slice(skip, skip + max));
            } else {
              resolve(sortedList);
            }
          } else if (sortTokens.length === 2) {
            const comp1 = sortTokens[0].split(' ');
            const field1 = comp1[0];
            const order1 = comp1[1];

            const comp2 = sortTokens[1].split(' ');
            const field2 = comp2[0];
            const order2 = comp2[1];

            sortedList.sort((e1, e2) => {
              return (order1 === 'asc' ? (e1[field1] - e2[field1]) : (e2[field1] - e1[field1])) ||
                (order2 === 'asc' ? (e1[field2] - e2[field2]) : (e2[field2] - e1[field2]));
            });

            if (skip >= 0 && max >= 0) {
              resolve(sortedList.slice(skip, skip + max));
            } else {
              resolve(sortedList);
            }
          }
        } else {
          if (skip >= 0 && max >= 0) {
            resolve(books.slice(skip, skip + max));
          } else {
            resolve(books);
          }
        }
      });
    },
  },
});
