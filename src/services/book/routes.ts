import { Request, Response } from "express";
import { createBook } from "./BookController";

const api_prefix = '/api/v1';

export default [
  // creating book
  {
    path: api_prefix + "/book/create",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await createBook(req.params.title, req.params.description);
        res.status(200).send("Book created.");
      }
    ]
  },

  // finding book by id
  {
    path: api_prefix + "/book/:book_id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        res.status(200).send(req.params.book_id);
      }
    ]
  },
  
  // editing book by id
  {
    path: api_prefix + "/book/edit/:book_id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        res.status(200).send(req.params.book_id);
      }
    ]
  },
  // deleting book by id
  {
    path: api_prefix + "/book/delete/:book_id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        res.status(200).send(req.params.book_id);
      }
    ]
  },
];