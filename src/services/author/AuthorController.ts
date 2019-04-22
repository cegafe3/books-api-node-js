import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {Author} from "./AuthorEntity";

export const createAuthor = async ( name: string ) => {

  const author = new Author();
  author.name = name;

  const authorRepository = getRepository(Author);

  return await authorRepository.save(author);
};

export const findAuthor = async (
    author_id: number
) => {

  const authorRepository = getRepository(Author);

  const author = await authorRepository.findOneOrFail(author_id, {
    select: ["id", "name", "created_at"],
  });

  return author;

};

export const allAuthors = async () => {

  const authorRepository = getRepository(Author);
  const authors = await authorRepository.find({
    select: ["id", "name", "created_at"] 
  });

  return authors;
};
  
export const editAuthor = async (
  author_id: number,
  name: string
) => {

  const authorRepository = getRepository(Author);
  const author = await authorRepository.findOneOrFail(author_id);

  author.name = name;

  await authorRepository.save(author);

  return 'Author updated.';
};

export const deleteAuthor = async (author_id: number) => {

  const authorRepository = getRepository(Author);
  const author = await authorRepository.findOneOrFail(author_id);

  authorRepository.delete(author_id);

  return 'Author deleted';
};