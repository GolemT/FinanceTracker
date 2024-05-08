import { ObjectId } from "mongodb";

export default interface Transaction {
    _id: ObjectId;
    user: string;
    name: string;
    date: string;
    tags: string[];
    amount: string
}