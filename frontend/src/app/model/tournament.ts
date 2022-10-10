import { Athlete } from "./athlete";

export class Tournament{
    sport:String;
    discipline:string;
    format:string;
    sex:string;
    start:string;
    end:string;
    locations:String[];
    athletes:Athlete[];
    delegat:string;
}