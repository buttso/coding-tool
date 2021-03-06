import { IMatchMetadata, IMatchProperties, IMediaSource, ICodedEventType, ICodedEventItem } from '../src/app/typings/model-metadata'
import { IButtonConfiguration } from '../src/app/typings/domain';

export class LongoFileConverter {

    public static convert(input: any): IMatchMetadata {

        let properties = LongoFileConverter.processProperties(input.Description);
        console.info('got properties')
        let buttonConfiguration = LongoFileConverter.processButtonConfiguration(input.Dashboard);
        console.info(`got ${buttonConfiguration.length} buttons`)
        let events = LongoFileConverter.processCodedEvents(input.Timeline, buttonConfiguration);
        console.info(`got ${events.length} events`)
        
        return {
            userId: '',
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {} as IMediaSource,
            identifier: ""
        } as IMatchMetadata;
    }


    static processButtonConfiguration(dashboard: any): IButtonConfiguration[] {
        
        if(dashboard !== undefined && dashboard !== null) {
            
            let events = (dashboard.List as any[]).map(e => {

                console.info(`[processButtonConfiguration]:: ${e.EventType.$id}`)
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

            console.info(events);
            
            return events.filter(e => e !== undefined);
        }
        
        return [] as IButtonConfiguration[];
    }


    static processCodedEvents(timeline: any, buttons: IButtonConfiguration[]): ICodedEventType[] {

        if(timeline !== undefined && timeline !== null) {

            console.info(`found timeline: ${timeline.length}`)
            let codedEventTypes = [] as ICodedEventType[];
            
            let events = (timeline as any[]).forEach(e => {

                console.info(`Looking for ${e.EventType.$ref}`)

                let button = buttons.filter(b => {
                    try {
                        return b.identifier.toString() == e.EventType.$ref.toString();
                    } catch(e) {
                        console.log(e);
                        //
                    }
                    return false;
                });
               
                if( button!== undefined) {

                    let btn = buttons[0];
                    console.info(`found button: ${btn.eventType}`)
                    let item = codedEventTypes.find(e => e.eventType == btn.eventType);
                    
                    if(item === null || item === undefined) {
                        item = {
                            eventType: btn.eventType,
                            events: []
                        } as ICodedEventType;
    
                        codedEventTypes.push(item);
                    }
    
                    let s = (e.EventTime / 1000) - btn.leadSeconds;
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

    static processProperties(metadata: any): IMatchProperties {
    
        if(metadata !== undefined && metadata !== null) {
            
            let properties = {
                competitionName: '',
                awayTeam: metadata.VisitorName,
                homeTeam: metadata.LocalName,
                grade: metadata.Competition,
                year: metadata.Season,
                matchName: metadata.Description,
                matchDate: metadata.MatchDate,
                roundNumber: 1,
                venue: ""
            } as IMatchProperties;

            return properties;            
        }
        
        return {} as IMatchProperties; 
    }
}