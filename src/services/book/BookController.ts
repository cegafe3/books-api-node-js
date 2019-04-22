import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Book } from "./BookEntity";
import { Author } from "../author/AuthorEntity";
import { HTTP400Error, HTTP404Error } from "../../utils/httpErrors";

export const createBook = async (
    title: string, 
    description: string
) => {

  const book = new Book();
  book.title = title;
  book.description = description;

  const errors = await validate(book);
  if (errors.length > 0) {
    throw new HTTP400Error({message: errors});
  }
  
  const bookRepository = getRepository(Book);

  return await bookRepository.save(book);
};

export const findBook = async (
    book_id: number
) => {

    const bookRepository = getRepository(Book);
    let book;
    try {
      book = await bookRepository.findOneOrFail(book_id, {
        select: ["id", "title", "description", "created_at", "updated_at"],
        relations: ["authors"]  
      });
    } catch (error) {
      throw new HTTP404Error({message: "Book not found."});
    }

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
  let book;
  try {
    book = await bookRepository.findOneOrFail(book_id);
  } catch (error) {
    throw new HTTP404Error({message: "Book not found."});
  }

  book.title = title;
  book.description = description;

  const errors = await validate(book);
  if (errors.length > 0) {
    throw new HTTP400Error({message: errors});
  }

  await bookRepository.save(book);

  return 'Book updated.';
};

export const deleteBook = async (book_id: number) => {

  const bookRepository = getRepository(Book);
  let book;
  try {
    book = await bookRepository.findOneOrFail(book_id);
  } catch (error) {
    throw new HTTP404Error({message: "Book not found."});
  }

  bookRepository.delete(book_id);

  return 'Book deleted';
};

export const associateAuthor = async (
    book_id: number,
    author_id: number
  ) => {

  const bookRepository = getRepository(Book);
  let book;
  try {
    book = await bookRepository.findOneOrFail(book_id,{
      relations: ["authors"]
    });
  } catch (error) {
    throw new HTTP404Error({message: "Book not found."});
  }

  const authorRepository = getRepository(Author);
  let author;
  try {
    author = await authorRepository.findOneOrFail(author_id);
  } catch (error) {
    throw new HTTP404Error({message: "Author not found."});
  }

  (book.authors as any) = [
    ...book.authors, 
    author
  ];

  await bookRepository.save(book);

  return 'Author added.';
};

export const bookAuthors = async (book_id: number) => {

  const bookRepository = getRepository(Book);
  let book;
  try {
    book = await bookRepository.findOneOrFail(book_id,{
      relations: ["authors"]
    });
  } catch (error) {
    throw new HTTP404Error({message: "Book not found."});
  }

  return book.authors;
};

export const deleteAuthorFromBook = async (
  book_id: number,
  author_id: number
) => {
  // verifying if the book exists before relationship delete
  const bookRepository = getRepository(Book);
  let book;
  try {
    book = await bookRepository.findOneOrFail(book_id,{
      relations: ["authors"]
    });
  } catch (error) {
    throw new HTTP404Error({message: "Book not found."});
  }

  // verifying if the author-book exists before trying relationship delete
  const authorRepository = getRepository(Author);
  const { authorCount } = await authorRepository.createQueryBuilder("author")
    .select("COUNT(*)", "authorCount")
    .from("author_books_book", "author_books_book")
    .where("author_books_book.bookId = :valueBook", { valueBook: book_id })
    .where("author_books_book.authorId = :valueAuthor", { valueAuthor: author_id })
    .getRawOne();
  
  if (authorCount == 0) {
    throw new HTTP404Error({message: "Author not found in the book."});
  }
  // delete relationship if all conditions are met
  const deleteAuthor = await bookRepository.createQueryBuilder("book")
    .delete()
    .from("author_books_book", "author_books_book")
    .where("author_books_book.bookId = :valueBook", { valueBook: book_id })
    .where("author_books_book.authorId = :valueAuthor", { valueAuthor: author_id })
    .execute();

  return 'Author removed from book.';
};

export const search = async (
  query: string,
) => {
  // verifying length of query
  if (query.length < 2) {
    throw new HTTP400Error({message: "Search query needs to be at least 2 characters long."});
  }
  const bookRepository = getRepository(Book);
  
  const books = await bookRepository.createQueryBuilder("book")
    .leftJoinAndSelect("book.authors", "author")
    .orWhere("book.title  like :book_title", { book_title: '%' + query + '%' })
    .orWhere("book.description  like :book_description", { book_description: '%' + query + '%' })
    .orWhere("author.name  like :author_name", { author_name: '%' + query + '%' })
    .getMany();

  return books;
};


