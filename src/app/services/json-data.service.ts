import { IMatchMetadata, ICodedEventType, IMatchProperties } from '../typings/model-metadata';

export class JsonDataService {

    fetchAll(): IMatchMetadata[] {
        return this.matchData;
    }

    findByIdentifier(identifier: string): IMatchMetadata {
        let foundItem = this.matchData.filter(e => e.$key === identifier);

        if (foundItem !== undefined) {
            return foundItem[0];
        }

        return null;
    }

    private matchData: IMatchMetadata[] = [
        {
            key$: "1",
            userId: "<empty>",
            properties: {
                competitionName: 'SA Metro',
                seasonName: 'Winter',
                matchName: "Preliminary Final",
                year: 2017,
                roundNumber: 24,
                grade: "PLM",
                homeTeam: "Adelaide",
                awayTeam: "Forestville",
                venue: "State Hockey Centre",
                matchDate: new Date().toString()
            },
            media: {
                src: "https://codingtoolproto.blob.core.windows.net/asset-f44bed4f-598a-4467-94c3-503426b3f1e9/R24_PF_AHCvFHC_FullGame.mp4?sv=2015-07-08&sr=c&si=cb841b3c-ffc9-4d6f-b18c-188877b38fa8&sig=frdhRSpqbMGHjVuJVIRbwjjhx4HyKJx2nit71zSv0F0%3D&st=2017-11-28T05%3A31%3A15Z&se=2117-11-28T05%3A31%3A15Z",
                type: "video/mp4",
                offlineSrc: ""
            },
            events: [
                {
                    "eventType": "Circle Entry For",
                    "events": [
                        {
                            "time": 22.429159,
                            "color": "blue"
                        },
                        {
                            "seconds": 218.943117,
                            "color": "blue"
                        },
                        {
                            "seconds": 261.075204,
                            "color": "blue"
                        }
                    ]
                },
                {
                    "eventType": "Goal For",
                    "events": [
                      {
                        "seconds": 2097.169531,
                        "color": "blue",
                      }
                    ]
                },
                {
                    "eventType": "Outlet",
                    "events": [
                        {
                            "seconds": 80.185615,
                            "color": "blue"
                        },
                        {
                            "seconds": 101.187035,
                            "color": "blue"
                        },
                        {
                            "seconds": 178.371353,
                            "color": "blue"
                        }
                    ]
                },
                {
                    "eventType": "Press",
                    "events": [
                        {
                            "seconds": 12.684826000000001,
                            "color": "blue"
                        },
                        {
                            "seconds": 142.398306,
                            "color": "blue"
                        },
                        {
                            "seconds": 199.435638,
                            "color": "blue"
                        }
                    ]
                },
                {
                    "eventType": "Special",
                    "events": [
                        {
                            "seconds": 16.442906,
                            "color": "red"
                        },
                        {
                            "seconds": 107.942185,
                            "color": "red"
                        },
                        {
                            "seconds": 203.140577,
                            "color": "red"
                        }
                    ]
                }
            ] as ICodedEventType[],
            buttons: {
                name: "Default",
                userId: '',
                buttons: [
                    { name: "Press", eventType: "Press", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Outlet", eventType: "Outlet", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Circle Entry For", eventType: "Circle Entry For", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Circle Entry Ag.", eventType: "Circle Entry Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Goal Shot Ag.", eventType: "Goal Shot Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Goal Shot For.", eventType: "Goal Shot For.", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Goal For", eventType: "Goal For", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Goal Ag.", eventType: "Goal Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                    { name: "APC", eventType: "APC", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                    { name: "DPC", eventType: "DPC", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                    { name: "Special", eventType: "Special", type: {name: ''}, color: "red", lagSeconds: 5, leadSeconds: 5 }
                ]
            },
            buttonConfiguration: []
        } as IMatchMetadata
    ]
}
