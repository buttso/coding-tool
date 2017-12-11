import { IMatchMetadata, IMatchProperties, IMediaSource, ICodedEventType, ICodedEventItem } from '../src/app/typings/model-metadata'
import { IButtonConfiguration } from '../src/app/typings/domain';

export class LongoFileConverter {

    Convert(input: any): IMatchMetadata {

        let properties = this.ProcessProperties(input.Description);
        console.info('got properties')
        let buttonConfiguration = this.ProcessButtonConfiguration(input.Dashboard);
        console.info('got buttons')
        let events = this.ProcessCodedEvents(input.Timeline, buttonConfiguration);
        console.info('got events')
        
        return {
            userId: '',
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

                if(e.EventType !== undefined && e.EventType.$id !== undefined)
                {
                    var identifier = e.EventType.$id;
                    
                    return {
                        identifier: e.EventType.$id,
                        eventType: e.Name,
                        color: "blue",
                        leadSeconds: e.Start / 1000,
                        lagSeconds: e.Stop / 1000
                    } as IButtonConfiguration;
                }
                
                
            }) as IButtonConfiguration[];     
            
            return events.filter(e => e !== undefined);
        }
        
        return [] as IButtonConfiguration[];
    }


    ProcessCodedEvents(timeline: any, buttons: IButtonConfiguration[]): ICodedEventType[] {

        if(timeline !== undefined && timeline !== null) {

            console.info(`found timeline: ${timeline.length}`)
            let codedEventTypes = [] as ICodedEventType[];
            
            let events = (timeline as any[]).forEach(e => {

                console.info(`Looking for ${e.EventType.$ref}`)

                let button = buttons.find(b => {
                    try {
                        return b.identifier.toString() == e.EventType.$ref.toString();
                    } catch {
                        return false;
                    }
                });
               
                if( button!== undefined) {

                    let btn = button;
                    console.info(`found button: ${btn.eventType}`)
                    let item = codedEventTypes.find(e => e.eventType == btn.eventType);
                    
                    if(item === null || item === undefined) {
                        item = {
                            eventType: btn.eventType,
                            events: []
                        } as ICodedEventType;
    
                        codedEventTypes.push(item);
                    }
    
                    let s = (e.EventTime / 1000) - button.leadSeconds;
                    item.events.push({
                        color: btn.color,
                        seconds: Math.max(s, 0)
                        
                    } as ICodedEventItem);
                }else{
                    console.info(`button was undefined`)
                }
            });

            console.info(`return 1`)
            return codedEventTypes.filter(e => e !== undefined);
        }
        
        console.info(`return 2`)
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
                date: metadata.MatchDate,
                roundNumber: 1,
                venue: ""
            } as IMatchProperties;

            return properties;            
        }
        
        return {} as IMatchProperties;
    }
}