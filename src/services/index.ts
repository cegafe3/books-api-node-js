import bookRoutes from "./book/BookRoutes";
import authorRoutes from "./author/AuthorRoutes";

// espreading attributes and exporting it
export default [
    ...bookRoutes,
    ...authorRoutes
];