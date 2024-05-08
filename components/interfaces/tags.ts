import { ObjectId } from "mongodb";

export default interface Tag {
    _id: ObjectId;
    user: string;
    name: string;
    desc: string;
}