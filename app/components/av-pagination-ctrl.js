/* Pagination component for server-side RESTful pagination
 *         ------------------------
 * Takes in the following properties:
 *         ------------------------
 * numItems          : int           -> How many items are in the data set
 * itemsPerPage      : int           -> How many items we wish to display per each page
 * numSkipped        : EmberProperty -> Reference to a controller's `skip` query parameter
 * doChangeSkipCount : Function      -> Emits an action that will be handled upstream
 *                                      (the router/controller will update the `skip` property)
 */

import Ember from 'ember';

// How many pages to display before abbreviating the list
const MAX_PAGES_DISPLAY = 10;

// How many pages to group together between ellipses
const PAGE_CLUSTER_SIZE = 5;

const ellipsis = '\u2026';

// Given # of pages, the "active" page, and a starting pg #,
// builds a list of page objects to be displayed in the UI
const buildPages = (numPages, activePage, startPage = 1) => {
  let pages = [];
  const endPage = startPage + numPages;

  for (let i = startPage; i < endPage; i++) {
    pages.push({
      pageNum: i,
      isActive: i === activePage,
    });
  }

  return pages;
};

/* Returns one of the following pagination types:
 * BASIC  - Fewer pages than our MAX_PAGES_DISPLAY count, so just show all of them
 * START  - Active page is one of the first few (within our PAGE_CLUSTER_SIZE), so show beginning of page list and abbr the rest
 * END    - Active page is one of the last pages, so just show end of the list and abbr. the rest (like START)
 * MIDDLE - Active pg is somewhere in the middle of the list, so "center" it and abbr. the ends of the list
 */
const getPaginationType = (numPages, activePage) => {
  if (numPages <= MAX_PAGES_DISPLAY) {
    return 'BASIC';
  } else if (activePage < PAGE_CLUSTER_SIZE) {
    return 'START';
  } else if (activePage > (numPages - PAGE_CLUSTER_SIZE + 1)) {
    return 'END';
  }

  return 'MIDDLE';
};

// Either builds basic pagination (all pages shown), or abbreviates it
// based on the paginationType
const buildPaginationData = (numPages, activePage) => {
  const paginationType = getPaginationType(numPages, activePage);
  switch (paginationType) {
    case 'BASIC':
      return buildPages(numPages, activePage);

    case 'START':
      return buildPages(PAGE_CLUSTER_SIZE, activePage)

        // ellipsis links to page # that's the avg. of last visible "start" page and the last page in the list
        .concat({display: ellipsis, pageNum: Math.floor((numPages + PAGE_CLUSTER_SIZE) / 2), isActive: false})
        .concat({pageNum: numPages, isActive: false});

    case 'END':
      return [{pageNum: 1, isActive: false}]

        // ellipsis links to page # that's the avg. of first visible "end" page and page 1
        .concat({display: ellipsis, pageNum: Math.floor((numPages - PAGE_CLUSTER_SIZE + 1) / 2), isActive: false})
        .concat(buildPages(PAGE_CLUSTER_SIZE, activePage, numPages - PAGE_CLUSTER_SIZE + 1));

    case 'MIDDLE':
      return [{pageNum: 1, isActive: false}]

        // ellipsis links to page # that's 25% into pages list
        .concat({display: ellipsis, pageNum: Math.floor(numPages / 4), isActive: false})
        .concat(buildPages(PAGE_CLUSTER_SIZE, activePage, activePage - Math.floor(PAGE_CLUSTER_SIZE / 2)))

        // ellipsis links to page # that's 75% into pages list
        .concat({display: ellipsis, pageNum: Math.floor(numPages * 0.75), isActive: false})
        .concat({pageNum: numPages, isActive: false});
  }
};

export default Ember.Component.extend({
  isPaginationRequired: Ember.computed('numItems', 'itemsPerPage', function() {
    return this.get('numItems') > this.get('itemsPerPage');
  }),

  pages: Ember.computed('numItems', 'itemsPerPage', 'numSkipped', function() {
    // Determine how many paginated pages there should be:
    const itemsPerPage = this.get('itemsPerPage');
    const numItems = this.get('numItems');
    const numSkipped = this.get('numSkipped');

    const numPages = Math.ceil(numItems / itemsPerPage);
    const activePage = Math.floor((numSkipped + itemsPerPage) / itemsPerPage);

    return buildPaginationData(numPages, activePage);
  }),

  // Booleans to help us disable back/forward arrows when appropriate
  isFirstPage: Ember.computed('numSkipped', function() {
    return this.get('numSkipped') === 0;
  }),

  isLastPage: Ember.computed('numSkipped', 'itemsPerPage', 'numItems', function() {
    return (this.get('numSkipped') + this.get('itemsPerPage')) >= this.get('numItems');
  }),

  actions: {
    pageClicked: function(pageNum) {
      const newNumSkipped = (pageNum - 1) * this.get('itemsPerPage');

      this.get('doChangeSkipCount')(newNumSkipped);
    },

    arrowClicked: function(arrowDirection) {
      const numSkipped = this.get('numSkipped');
      const itemsPerPage = this.get('itemsPerPage');

      // Note: We don't need to check edge cases (on first/last page)
      // for arrow event because our UI already disables links when this occurs

      // Double note: We DO have to check edge cases, because ember still kicks off
      // actions for disabled links :(
      switch (arrowDirection) {
        case 'BACK':
          if (this.get('isFirstPage')) {
            return;
          }

          this.get('doChangeSkipCount')(numSkipped - itemsPerPage);
          break;
        case 'FORWARD':
          if (this.get('isLastPage')) {
            return;
          }

          this.get('doChangeSkipCount')(numSkipped + itemsPerPage);
          break;
        default:
          throw new Error('Pagination Component expected recognizable arrow click!');
      }
    },
  },
});
