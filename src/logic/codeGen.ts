import { readFileSync } from "fs";

export class CodeGen {
    private filePath : string;
    private finalString : string = "";
    private counter : number = 0;

    private userPipeline : any;

    public constructor(filePath: string) {
        this.filePath = filePath;
        this.userPipeline = JSON.parse(readFileSync(this.filePath,"utf-8"));
    }



}

const myvar : CodeGen = new CodeGen("./testUserPipeline.json");

