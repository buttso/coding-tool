import { ICodingEvent, IButtonConfiguration } from "./domain";

export interface IMatchMetadata {
    identifier: string;
    properties: IMatchProperties, 
    media: IMediaSource,
    events: ICodedEventType[],
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

export interface ICodedEventType {
    eventType: string, 
    events: ICodedEventItem[]
}

// used to display in timeline UI
export interface ICodedEventItem {
    seconds: number, 
    color: string
}