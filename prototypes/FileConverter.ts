import { IMatchMetadata, IMatchProperties, IMediaSource, ICodedEventType, ICodedEventItem } from '../src/app/typings/model-metadata'
import { IButtonConfiguration } from '../src/app/typings/domain';

export class FileConverter {

    Convert(input: any): IMatchMetadata {

        let properties = this.ProcessProperties(input.Description);
        let buttonConfiguration = this.ProcessButtonConfiguration(input.Dashboard);
        let events = this.ProcessCodedEvents(input.Timeline, buttonConfiguration);
        
        return {
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {} as IMediaSource,
            identifier: ""
        } as IMatchMetadata;
    }


    ProcessButtonConfiguration(dashboard: any): IButtonConfiguration[] {
        
        if(dashboard !== undefined && dashboard !== null) {
            
            let events = (dashboard.List as any[]).map(e => {
                return {
                    identifier: e.$id,
                    eventType: e.Name,
                    color: "blue",
                    leadSeconds: e.Start / 1000,
                    lagSeconds: e.Stop / 1000
                } as IButtonConfiguration;
                
            }) as IButtonConfiguration[];     
            
            return events;
        }
        
        return [] as IButtonConfiguration[];
    }


    ProcessCodedEvents(timeline: any, buttons: IButtonConfiguration[]): ICodedEventType[] {

        if(timeline !== undefined && timeline !== null) {

            let codedEventTypes = [] as ICodedEventType[];
            
            let events = (timeline as any[]).forEach(e => {

                let button = buttons.find(b => b.identifier === e.EventType.$ref)[0];

                let item = codedEventTypes.find(e => e.eventType == button.eventType)
                if(item === null || item === undefined) {
                    item = {
                        eventType: button.eventType,
                        events: []
                    } as ICodedEventType;

                    codedEventTypes.push(item);
                }

                item.events.push({
                    color: button.color,
                    seconds: e.EventTime / 1000
                } as ICodedEventItem);

            });

            return codedEventTypes;
        }
        
        return [] as ICodedEventType[];
    }

    ProcessProperties(metadata: any): IMatchProperties {
    
        if(metadata !== undefined && metadata !== null) {
            
            let properties = {
                awayTeam: metadata.VisitorName,
                homeTeam: metadata.LocalName,
                grade: metadata.Competition,
                year: metadata.Season,
                matchName: metadata.Description,
                date: metadata.MatchDate
            } as IMatchProperties;

            return properties;            
        }
        
        return {} as IMatchProperties;
    }
}