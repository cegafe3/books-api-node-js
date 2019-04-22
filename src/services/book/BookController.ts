import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {Book} from "./BookEntity";
import {Author} from "../author/AuthorEntity";

export const createBook = async (
    title: string, 
    description: string
) => {

  const book = new Book();
  book.title = title;
  book.description = description;

  const bookRepository = getRepository(Book);

  return await bookRepository.save(book);
};

export const findBook = async (
    book_id: number
) => {

    const bookRepository = getRepository(Book);

    const book = await bookRepository.findOneOrFail(book_id, {
      select: ["id", "title", "description", "created_at"],
      relations: ["authors"]  
    });

    return book;

};

export const allBooks = async () => {

  const bookRepository = getRepository(Book);
  const books = await bookRepository.find({
    select: ["id", "title", "description", "created_at", "updated_at"],
    relations: ["authors"]  
  });
  return books;
};
  
export const editBook = async (
  book_id: number,
  title: string,
  description: string
) => {

  const bookRepository = getRepository(Book);
  const book = await bookRepository.findOneOrFail(book_id);

  book.title = title;
  book.description = description;

  await bookRepository.save(book);

  return 'Book updated.';
};

export const deleteBook = async (book_id: number) => {

  const bookRepository = getRepository(Book);
  const book = await bookRepository.findOneOrFail(book_id);

  bookRepository.delete(book_id);

  return 'Book deleted';
};

export const associateAuthor = async (
    book_id: number,
    author_id: number
  ) => {

  const bookRepository = getRepository(Book);
  const book = await bookRepository.findOneOrFail(book_id,{
    relations: ["authors"]
  });

  const authorRepository = getRepository(Author);
  const author = await authorRepository.findOneOrFail(author_id);

  (book.authors as any) = [
    ...book.authors, 
    author
  ];

  await bookRepository.save(book);

  return 'Author added.';
};

export const bookAuthors = async (book_id: number) => {

  const bookRepository = getRepository(Book);
  const book = await bookRepository.findOneOrFail(book_id,{
    relations: ["authors"]
  });

  return book.authors;
};

export const deleteAuthorFromBook = async (
  book_id: number,
  author_id: number
) => {

  const bookRepository = getRepository(Book);
  const deleteAuthor = bookRepository.createQueryBuilder("book")
    .delete()
    .from("author_books_book", "author_books_book")
    .where("author_books_book.bookId = :valueBook", { valueBook: book_id })
    .where("author_books_book.authorId = :valueAuthor", { valueAuthor: author_id })
    .execute();

  return 'Author removed from book';
};


