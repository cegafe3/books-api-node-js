// importing all middlewares for latter applying it to the domrouter
import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression
  } from "./common";

export default [
    handleCors, 
    handleBodyRequestParsing, 
    handleCompression
];
