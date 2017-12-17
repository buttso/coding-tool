import { ICodingEvent } from "./domain";

export interface IMatchMetadata {
    $key?: string;
    userId: string;
    properties: IMatchProperties, 
    media: IMediaSource,
    events: ICodedEventType[],
    buttons: ICodingButtonSet,
    buttonConfiguration: IButtonConfiguration[]
}

export interface IMatchProperties {
    matchName: string, 
    competitionName: string;
    year: number, 
    roundNumber?: number, 
    grade?: string, 
    homeTeam: string, 
    awayTeam: string, 
    venue: string,
    matchDate: string 
}

export interface IMediaSource {
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

export interface ICodingButtonSet {
    $key?: string;
    userId: string;
    name: string;
    description?: string;
    buttons: IButtonConfiguration[]
}

export interface IButtonType {
    name: string;
}

export interface IButtonConfiguration {
    $key?: string;
    type: IButtonType;
    identifier?: string;  // obsolete
    name?: string;
    eventType: string;  // obsolete
    color: string;
    leadSeconds: number;
    lagSeconds: number;
}