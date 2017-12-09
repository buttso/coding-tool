import { IMatchMetadata, IMatchProperties, IMediaSource, ICodedEventType, ICodedEventItem } from '../src/app/typings/model-metadata'
import { IButtonConfiguration } from '../src/app/typings/domain';

export class SportsCodeFileConverter {

    Convert(input: any): IMatchMetadata {

        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(input, "text/xml");
        // print the name of the root element or error message
        console.log(oDOM.documentElement.nodeName == "parsererror" ? "error while parsing" : oDOM.documentElement.nodeName);

        let properties = this.ProcessProperties(oDOM);
        let buttonConfiguration = this.ProcessButtonConfiguration(oDOM);
        let events = this.ProcessCodedEvents(oDOM, buttonConfiguration);
        
        return {
            userId: '',
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {} as IMediaSource,
            identifier: ""
        } as IMatchMetadata;
    }

    ProcessButtonConfiguration(dom: Document): IButtonConfiguration[] {
        
        let buttonConfiguration = [] as IButtonConfiguration[];

        if(dom !== undefined && dom !== null) {

            let instances = dom.getElementsByTagName("instance");
            for (let i = 0; i < instances.length; i++) {
                let identifier = instances[i].getElementsByTagName('ID')[0].textContent;
                let code = instances[i].getElementsByTagName('code')[0].textContent;

                buttonConfiguration.push(
                    {
                        identifier: identifier,
                        eventType: code,
                        color: "blue",
                        leadSeconds: 5,
                        lagSeconds: 5
                    } as IButtonConfiguration
                )
            }
        }
        
        return buttonConfiguration;
    }


    ProcessCodedEvents(dom: Document, buttons: IButtonConfiguration[]): ICodedEventType[] {

        let codedEventTypes = [] as ICodedEventType[];

        if(dom !== undefined && dom !== null) {

            let instances = dom.getElementsByTagName("instance");
            for (let i = 0; i < instances.length; i++) {
                let identifier = instances[i].getElementsByTagName('ID')[0].textContent;
                let code = instances[i].getElementsByTagName('code')[0].textContent;
                let start = instances[i].getElementsByTagName('start')[0].textContent;
                let end = instances[i].getElementsByTagName('end')[0].textContent;

                let item = codedEventTypes.find(e => e.eventType ==code);

                if(item === null || item === undefined) {
                    item = {
                        eventType: code,
                        events: []
                    } as ICodedEventType;

                    codedEventTypes.push(item);
                }

                let seconds = (+start + +end / 2)

                item.events.push({
                    color: 'blue',
                    seconds: seconds
                } as ICodedEventItem);
            }
        }
        
        return codedEventTypes.filter(e => e !== undefined);;
    }

    ProcessProperties(dom: Document): IMatchProperties {
    
        if(dom !== undefined && dom !== null) {
            
            let properties = {
                awayTeam: '',
                homeTeam: '',
                grade: '',
                year: new Date().getFullYear(),
                matchName: '',
                date: '',
                roundNumber: 0,
                venue: ''
            } as IMatchProperties;

            return properties;            
        }
        
        return {} as IMatchProperties;
    }
}