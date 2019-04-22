import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Author } from "./AuthorEntity";

import { HTTP400Error, HTTP404Error } from "../../utils/httpErrors";

export const createAuthor = async ( name: string ) => {

  const author = new Author();
  author.name = name;

  const errors = await validate(author);
  if (errors.length > 0) {
    throw new HTTP400Error({message: errors});
  }
  
  const authorRepository = getRepository(Author);

  return await authorRepository.save(author);
};

export const findAuthor = async (
    author_id: number
) => {

    const authorRepository = getRepository(Author);
    let author;
    try {
      author = await authorRepository.findOneOrFail(author_id, {
        select: ["id", "name", "created_at", "updated_at"],
        relations: ["books"]  
      });
    } catch (error) {
      throw new HTTP404Error({message: "Author not found."});
    }

    return author;
};

export const allAuthors = async () => {

  const authorRepository = getRepository(Author);
  const authors = await authorRepository.find({
    select: ["id", "name", "created_at", "updated_at"],
    relations: ["books"]  
  });
  return authors;
};
  
export const editAuthor = async (
  author_id: number,
  name: string
) => {

  const authorRepository = getRepository(Author);
  let author;
  try {
    author = await authorRepository.findOneOrFail(author_id);
  } catch (error) {
    throw new HTTP404Error({message: "Author not found."});
  }

  author.name = name;

  const errors = await validate(author);
  if (errors.length > 0) {
    throw new HTTP400Error({message: errors});
  }

  await authorRepository.save(author);

  return 'Author updated.';
};

export const deleteAuthor = async (author_id: number) => {

  const authorRepository = getRepository(Author);
  let author;
  try {
    author = await authorRepository.findOneOrFail(author_id);
  } catch (error) {
    throw new HTTP404Error({message: "Author not found."});
  }

  authorRepository.delete(author_id);

  return 'Author deleted';
};

export const authorBooks = async (author_id: number) => {

  const authorRepository = getRepository(Author);
  let author;
  try {
    author = await authorRepository.findOneOrFail(author_id,{
      relations: ["books"]
    });
  } catch (error) {
    throw new HTTP404Error({message: "Author not found."});
  }

  return author.books;
};

export const search = async (
  query: string,
) => {
  // verifying length of query
  if (query.length < 2) {
    throw new HTTP400Error({message: "Search query needs to be at least 2 characters long."});
  }
  const authorRepository = getRepository(Author);
  
  const authors = await authorRepository.createQueryBuilder("author")
    .leftJoinAndSelect("author.books", "book")
    .orWhere("book.title  like :book_title", { book_title: '%' + query + '%' })
    .orWhere("book.description  like :book_description", { book_description: '%' + query + '%' })
    .orWhere("author.name  like :author_name", { author_name: '%' + query + '%' })
    .getMany();

  return authors;
};




