// intialise db and using it value
import dexie from 'dexie';

const db = new dexie('books');
db.version(1).stores({
  books: `bookID, title, *authors`,
});
db.version(1).stores({
  cart: 'bookID',
});
db.open().catch(function (err) {
  console.error(err.stack || err);
});
export default function getDatabase() {
  console.log('db', db);
  return db;
}
