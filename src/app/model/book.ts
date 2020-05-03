import { Writer } from './writer'
import { Review } from './review'

export enum Genre {
    TRAGEDY = 'TRAGEDY',
    DRAMA = 'DRAMA',
    HORROR = 'HORROR',
    FANTASY = 'FANTASY'
}

export class Book {
    id: number;
    bookName: string;
    annotation: string;
    publicationDate: Date;
    filename: string;

    writer: Writer;
    genres: Array<Genre> = new Array();
    reviews: Array<Review> = new Array();
}
