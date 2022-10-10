import { Match } from "./match";

export class ResultT{
    sport:String;
    discipline:string;
    sex:string;
    round:number;
    delegat:string;
    osmina:Array<Match>
    cetvrtina:Array<Match>
    polufinale:Array<Match>
    finale:Array<Match>
    treceMesto:Array<Match>
}