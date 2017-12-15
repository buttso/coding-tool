import { IMatchMetadata } from "../typings/model-metadata";
import { LongoFileConverter } from "../converters/LongoFileConverter";



export class MatchParserService {

    public parse(input: string): IMatchMetadata {
        let json = JSON.parse(input);
        // console.log(json)
        return LongoFileConverter.convert(json);
    }

}