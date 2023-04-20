import db from "../data/memory-database";
import testDb from "../../tests/data/memory-database";

console.log("fuck me");
const database = process.env.NODE_ENV === "test" ? testDb : db;
console.log(database);

export default database;
