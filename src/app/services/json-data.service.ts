import { IMatchMetadata, ICodedEventType } from '../typings/model-metadata';

export class JsonDataService {

    fetchAll(): IMatchMetadata[] {
        return this.matchData;
    }

    findByIdentifier(identifier: string): IMatchMetadata {
        let foundItem = this.matchData.filter(e => e.identifier === identifier);

        if (foundItem !== undefined) {
            return foundItem[0];
        }

        return null;
    }

    private matchData: IMatchMetadata[] = [
        {
            identifier: "1",
            properties: {
                matchName: "Preliminary Final",
                year: 2017,
                roundNumber: 24,
                grade: "PLM",
                homeTeam: "Adelaide",
                awayTeam: "Forestville",
                venue: "State Hockey Centre"
            },
            media: {
                name: "2017 PLM Preliminary Final",
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
            buttonConfiguration: [
                { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
            ]
        } as IMatchMetadata,
        {
            identifier: "2",
            properties: {
                matchName: "Grand Final",
                year: 2017,
                roundNumber: 25,
                grade: "PLM",
                homeTeam: "Seacliff",
                awayTeam: "Adelaide",
                venue: "State Hockey Centre"
            },
            media: {
                name: "2017 PLM Grand Final",
                src: "https://codingtoolproto.blob.core.windows.net/asset-883ab032-7cb1-4d85-b6fb-e882a8c8ae2d/R25_GF_SHCvAHC_FullGame_1920x1080_AACAudio_5690.mp4?sv=2015-07-08&sr=c&si=3701f404-eb15-4ab8-8b7d-4a2648be8db7&sig=lXNXI3xytOuT7fWayOOcTdZqBYW3m5H%2B2d0oCaxaZqI%3D&st=2017-11-28T20%3A57%3A26Z&se=2117-11-28T20%3A57%3A26Z",
                type: "video/mp4",
                offlineSrc: ""
            },
            events: [],
            buttonConfiguration: [
                { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
            ]
        } as IMatchMetadata,
        {
            identifier: "3",
            properties: {
                matchName: "Sample Video",
                year: 1,
                roundNumber: 0,
                grade: "(none)",
                homeTeam: "(none)",
                awayTeam: "(none)",
                venue: "(none)"
            },
            media: {
                name: "Azure Media Player Sample",
                src: "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest",
                type: "application/vnd.ms-sstr+xml",
                offlineSrc: ""
            },
            events: [],
            buttonConfiguration: [
                { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
            ]
        } as IMatchMetadata
    ]
}
