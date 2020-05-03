import { Review } from './review';

export enum Role {
    ROLE_USER = 'ROLE_USER',
    ROLE_MODERATOR = 'ROLE_MODERATOR',
    ROLE_ADMIN = 'ROLE_ADMIN'
}

export class User {
    id: number;
    username: string;

    roles: Array<string> = new Array();
    reviews: Array<Review> = new Array();
}
