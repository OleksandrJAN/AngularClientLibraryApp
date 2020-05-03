import { Book } from './book';
import { User } from './user';

export enum Assessment {
    NEGATIVE = 'NEGATIVE',
    NEUTRAL = 'NEUTRAL',
    POSITIVE = 'POSITIVE'
}

export class Review {
    id: number;
    text: string;
    assessment: Assessment;

    bookId: number;
    bookName: string;

    username: string;
    authorId: number;
}
