import { Amount } from 'src/app/models/Amount.model';

export class Expense {

    constructor (
        // public id: string,
        public purchasedOn: string,
        public nature: string,
        public originalAmount: number,
        public currency: string,
        // public convertedAmount: Amount,
        public comment: string,
        // public createdAt: string,
        // public lastModifiedAt: string
        ){}
}