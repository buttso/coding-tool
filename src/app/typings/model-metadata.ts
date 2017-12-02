import { ICodingEvent, IButtonConfiguration } from "./domain";

export interface IMatchMetadata {
    identifier: string;
    properties: IMatchProperties, 
    media: IMediaSource,
    events: ICodingEvent[],
    buttonConfiguration: IButtonConfiguration[]
}

export interface IMatchProperties {
    matchName: string, 
    year: number, 
    roundNumber: number, 
    grade: string, 
    homeTeam: string, 
    awayTeam: string, 
    venue: string
}

export interface IMediaSource {
    name: string,
    src: string,
    type: string,
    offlineSrc?: string
}