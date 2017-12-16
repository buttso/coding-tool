import { IMatchMetadata, IMatchProperties, IMediaSource, ICodedEventType, ICodedEventItem } from '../typings/model-metadata'
import { IButtonConfiguration, ICodingButtonSet } from '../typings/domain';

export class LongoFileConverter {

    public static convert(input: any): IMatchMetadata {
        console.log(input)
        let properties = LongoFileConverter.processProperties(input.Description);
        console.info('got properties')
        let buttonSet = LongoFileConverter.processButtonConfiguration(input.Dashboard);
        console.info(`got ${buttonSet.buttons.length} buttons`)
        let events = LongoFileConverter.processCodedEvents(input.Timeline, buttonSet.buttons);
        console.info(`got ${events.length} events`)
        
        return {
            userId: '',
            properties: properties,
            events: events,
            buttons: buttonSet,
            buttonConfiguration: null,
            media: {} as IMediaSource,
            identifier: ""
        } as IMatchMetadata;
    }


    static processButtonConfiguration(dashboard: any): ICodingButtonSet {
        
        console.info(`buttons: begin`)
        if(dashboard !== undefined && dashboard !== null) {
            console.info(`buttons: got a dashboard`)
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
            let buttonConfiguration = events.filter(e => e !== undefined);

            return {
                name: "",
                buttons: buttonConfiguration    
            };
        }
        
        return {} as ICodingButtonSet;
    }


    static processCodedEvents(timeline: any, buttons: IButtonConfiguration[]): ICodedEventType[] {

        if(timeline !== undefined && timeline !== null) {

            console.info(`found timeline: ${timeline.length}`)
            let codedEventTypes = [] as ICodedEventType[];
            
            let events = (timeline as any[]).forEach(e => {

                console.info(`Looking for ${e.EventType.$ref}`)

                let btns = buttons.filter(b => {
                    try {
                        return b.identifier.toString() == e.EventType.$ref.toString();
                    } catch(e) {
                        console.log(e);
                        //
                    }
                    return false;
                });
               
                if( btns!== undefined && btns[0] !== undefined) {

                    let btn = btns[0];
                    console.log(btn)
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

            console.info(codedEventTypes);
            return codedEventTypes.filter(e => e !== undefined);
        }
        
        console.info(`no coded events types found`)
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