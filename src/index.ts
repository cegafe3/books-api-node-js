import "reflect-metadata";
import {createConnection} from "typeorm";
import {Book} from "./services/book/BookEntity";

createConnection().then(async connection => {

    console.log("Inserting a new book into the database...");
    const book = new Book();
    book.title = "Timber";
    book.description = "Saw";

    await connection.manager.save(book);
    console.log("Saved a new book with id: " + book.id);

    console.log("Loading books from the database...");
    const books = await connection.manager.find(Book);
    console.log("Loaded books: ", books);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
