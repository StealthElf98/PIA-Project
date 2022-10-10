import { Match } from "./match";

export class Points{
    country:string;
    points:number;
    matches:Array<Match>

    constructor(c,p,m){
        this.country = c; this.points=p; this.matches = m;
    }
}