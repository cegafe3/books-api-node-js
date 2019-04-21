import { getRepository } from "typeorm";
import {Book} from "./BookEntity";

export const createBook = async (
    title: string, 
    description: string
) => {

  const book = new Book();
  book.title = 'test';
  book.description = 'descricao';

  const userRepository = getRepository(Book);

  return await userRepository.save(book);
};

export const getBook = async (
    book_id: number
) => {
    
    const book = new Book();
    book.title = 'test';
    book.description = 'descricao';
  
    const userRepository = getRepository(Book);
  
    return await userRepository.save(book);
  };
  