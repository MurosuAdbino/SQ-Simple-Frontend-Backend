const {
  addBookHandler,
  displayAllBooksHandler,
  showBookDetailsHandler,
  changeBookDataHandler,
  deleteBookHandler,
} = require('./handler');

const routes = [
  {
    // Nyimpan Buku
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    // Melihat semua Buku 
    method: 'GET',
    path: '/books',
    handler: displayAllBooksHandler,
  },
  {
    // Menampilkan detail Buku
    method: 'GET',
    path: '/books/{bookId}',
    handler: showBookDetailsHandler,
  },
  {
    // Mengedit data buku 
    method: 'PUT',
    path: '/books/{bookId}',
    handler: changeBookDataHandler,
  },
  {
    // Menghapus buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
