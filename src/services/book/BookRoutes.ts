import { Request, Response } from "express";
import { 
  findBook, 
  allBooks, 
  createBook,
  editBook,
  deleteBook,
  associateAuthor,
  bookAuthors,
  deleteAuthorFromBook,
  search,
} from "./BookController";
import { checkSearchParams } from "../../middleware/checks";

const api_prefix = '/api/v1';

export default [
  // listing all books
  {
    path: api_prefix + "/book",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await allBooks();
        res.status(200).send(result);
      }
    ]
  },

  // creating book
  {
    path: api_prefix + "/book/create",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await createBook(
          req.query.title, 
          req.query.description
        );
        res.status(200).send("Book created");
      }
    ]
  },

  // finding book by id
  {
    path: api_prefix + "/book/:book_id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await findBook(req.params.book_id);
        res.status(200).send(result);
      }
    ]
  },
  
  // editing book by id
  {
    path: api_prefix + "/book/edit/:book_id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const result = await editBook(
          req.params.book_id, 
          req.query.title, 
          req.query.description
        );
        res.status(200).send(result);
      }
    ]
  },
  // deleting book by id
  {
    path: api_prefix + "/book/delete/:book_id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const result = await deleteBook(req.params.book_id);
        res.status(200).send(result);
      }
    ]
  },
  // associating author with book
  {
    path: api_prefix + "/book/associate-author/:book_id",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await associateAuthor(
          req.params.book_id,
          req.query.author_id
        );
        res.status(200).send(result);
      }
    ]
  },
  // getting the authors of a book
  {
    path: api_prefix + "/book/author/:book_id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await bookAuthors(
          req.params.book_id
        );
        res.status(200).send(result);
      }
    ]
  },
  // delete author from a book
  {
    path: api_prefix + "/book/delete-author/:book_id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const result = await deleteAuthorFromBook(
          req.params.book_id,
          req.query.author_id,
        );
        res.status(200).send(result);
      }
    ]
  },
  // search books by title, description and author name
  {
    path: api_prefix + "/book/search",
    method: "get",
    handler: [
      checkSearchParams,
      async (req: Request, res: Response) => {
        const result = await search(req.query.query);
        res.status(200).send(result);
      }
    ]
  },
];