import { Book } from './book'

export class Writer {
    id: number;
    firstName: string;
    lastName: string;

    books: Array<Book> = new Array();
}
