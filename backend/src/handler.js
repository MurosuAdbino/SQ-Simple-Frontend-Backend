// Menyimpan books
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  
  if ((name !== undefined) && pageCount >= readPage) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    books.push(newBook);
    response.code(201);
    return response;
  }

  
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Menampillkn semua books
const displayAllBooksHandler = (request, h) => {
  const {
    name,
    finished,
    reading,
  } = request.query;

  let find = books;

  if (name) {
    find = books.filter((book) => book.name.toUpperCase().includes(name.toUpperCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: find.map((bs) => ({
          id: bs.id,
          name: bs.name,
          publisher: bs.publisher,
        })),
      },
    });
    return response;
  }

  if (finished == 1) {
    find = books.filter((book) => Number(book.finished) === Number(finished));
    const response = h.response({
      status: 'success',
      data: {
        books: find.map((bs) => ({
          id: bs.id,
          name: bs.name,
          publisher: bs.publisher,
        })),
      },
    });
    return response;
  }

  if (finished == 0) {
    find = books.filter((book) => book.finished == finished);
    const response = h.response({
      status: 'success',
      data: {
        books: find.map((bs) => ({
          id: bs.id,
          name: bs.name,
          publisher: bs.publisher,
        })),
      },
    });
    return response;
  }

  if (reading == 1) {
    find = books.filter((book) => Number(book.reading) === Number(reading));
    const response = h.response({
      status: 'success',
      data: {
        books: find.map((bs) => ({
          id: bs.id,
          name: bs.name,
          publisher: bs.publisher,
        })),
      },
    });
    return response;
  }

  if (reading == 0) {
    find = books.filter((book) => Number(book.reading) == !Number(reading));
    const response = h.response({
      status: 'success',
      data: {
        books: find.map((bs) => ({
          id: bs.id,
          name: bs.name,
          publisher: bs.publisher,
        })),
      },
    });
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: find.map((bs) => ({
        id: bs.id,
        name: bs.name,
        publisher: bs.publisher,
      })),
    },
  });
  return response;
};

// Menampilkan detail books
const showBookDetailsHandler = (request, h) => {
  const { bookId } = request.params;
  const findBook = books.filter((b) => b.id === bookId)[0];
  // When the book with attached id is found
  if (findBook !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: findBook,
      },
    });
    response.code(200);
    return response;
  }

  
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Edit Data books
const changeBookDataHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// hapus books
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  displayAllBooksHandler,
  showBookDetailsHandler,
  changeBookDataHandler,
  deleteBookHandler,
};
