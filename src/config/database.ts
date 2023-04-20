import db from "../data/memory-database";
import testDb from "../../tests/data/memory-database";

const database = process.env.NODE_ENV === "test" ? testDb : db;

export default database;
