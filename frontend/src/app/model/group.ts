import { Points } from "./points"

export class Group{
    groupA:Array<Points>
    groupB:Array<Points>
    sex:String;
    sport:String;

    constructor(a,b,s,sp){
        this.groupA=a; this.groupB=b; this.sex=s; this.sport=sp;
    }
}