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

  model() {
    return books;
  },

  actions: {
    onLoadBooks(sortOrder) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        const sortTokens = sortOrder.split(',');
        if (sortTokens.length > 0) {
          let sortedList = Object.assign([], books);
          sortTokens.forEach((sortToken) => {
            const comp = sortToken.split(' ');
            const field = comp[0];
            const order = comp[1];

            if (field === 'pages') {
              sortedList.sort((e1, e2) => {
                if (order === 'asc') {
                  return e1.pages - e2.pages;
                } else {
                  return e2.pages - e1.pages;
                }
              });
            } else if (field === 'price') {
              sortedList.sort((e1, e2) => {
                if (order === 'asc') {
                  return e1.price - e2.price;
                } else {
                  return e2.price - e1.price;
                }
              });
            } else {
              resolve(books);
            }

            resolve(sortedList);
          });
        } else {
          resolve(books);
        }
      });
    },
  },
});
