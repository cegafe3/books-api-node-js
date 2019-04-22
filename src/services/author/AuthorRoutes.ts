import { Request, Response } from "express";
import { 
  findAuthor, 
  allAuthors, 
  createAuthor,
  editAuthor,
  deleteAuthor 
} from "./AuthorController";
import { validate } from "class-validator";

const api_prefix = '/api/v1';

export default [
  // listing all authors
  {
    path: api_prefix + "/author",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await allAuthors();
        res.status(200).send(result);
      }
    ]
  },

  // creating author
  {
    path: api_prefix + "/author/create",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await createAuthor(
          req.query.name
        );
        res.status(200).send("Author created");
      }
    ]
  },

  // finding author by id
  {
    path: api_prefix + "/author/:author_id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await findAuthor(req.params.author_id);
        res.status(200).send(result);
      }
    ]
  },
  
  // editing author by id
  {
    path: api_prefix + "/author/edit/:author_id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const result = await editAuthor(
          req.params.author_id, 
          req.query.name
        );
        res.status(200).send(result);
      }
    ]
  },
  // deleting author by id
  {
    path: api_prefix + "/author/delete/:author_id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const result = await deleteAuthor(req.params.author_id);
        res.status(200).send(result);
      }
    ]
  },
];