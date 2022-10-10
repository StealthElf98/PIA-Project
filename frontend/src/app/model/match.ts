export class Match{
    name1:string;
    name2:string;
    sex:string;
    sport:String;
    discipline:string;
    date:string;
    time:string;
    location:string;
    result:string;


    constructor(a:string, b:string, c:string, d:String, e:string, f:string, g:string, h:string, i:string){
        this.name1 = a;
        this.name2 = b; this.sex = c; this.sport = d; this.discipline = e; this.date = f; 
        this.time = g; this.location = h; this.result = i;
    }
}