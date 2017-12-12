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
            key$: "2",
            userId: "<empty>",
            "properties": {
                competitionName: 'SA Metro',
                seasonName: 'Winter',
                "awayTeam": "AHC PLM",
                "homeTeam": "Seacliff",
                "grade": "PLM",
                "year": 2017,
                "matchName": "Grand Final",
                "matchDate": "2017-09-16T08:16:57.615007Z",
                roundNumber: 1,
                venue: ""
            } as IMatchProperties,
            "events": [
                {
                    "eventType": "Press",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 42.344
                        },
                        {
                            "color": "blue",
                            "seconds": 98.924
                        },
                        {
                            "color": "blue",
                            "seconds": 133.584
                        },
                        {
                            "color": "blue",
                            "seconds": 274.609
                        },
                        {
                            "color": "blue",
                            "seconds": 309.684
                        },
                        {
                            "color": "blue",
                            "seconds": 445.931
                        },
                        {
                            "color": "blue",
                            "seconds": 574.053
                        },
                        {
                            "color": "blue",
                            "seconds": 616.584
                        },
                        {
                            "color": "blue",
                            "seconds": 691.88
                        },
                        {
                            "color": "blue",
                            "seconds": 995.412
                        },
                        {
                            "color": "blue",
                            "seconds": 1233.508
                        },
                        {
                            "color": "blue",
                            "seconds": 1358.96
                        },
                        {
                            "color": "blue",
                            "seconds": 1664.82
                        },
                        {
                            "color": "blue",
                            "seconds": 2180.004
                        },
                        {
                            "color": "blue",
                            "seconds": 2701.025
                        }
                    ]
                },
                {
                    "eventType": "Outlet",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 68.209
                        },
                        {
                            "color": "blue",
                            "seconds": 340.246
                        },
                        {
                            "color": "blue",
                            "seconds": 363.144
                        },
                        {
                            "color": "blue",
                            "seconds": 641.904
                        },
                        {
                            "color": "blue",
                            "seconds": 813.891
                        },
                        {
                            "color": "blue",
                            "seconds": 860.498
                        },
                        {
                            "color": "blue",
                            "seconds": 973.1
                        },
                        {
                            "color": "blue",
                            "seconds": 1054.773
                        },
                        {
                            "color": "blue",
                            "seconds": 1422.667
                        },
                        {
                            "color": "blue",
                            "seconds": 1465.1
                        },
                        {
                            "color": "blue",
                            "seconds": 1737.563
                        },
                        {
                            "color": "blue",
                            "seconds": 2514.304
                        },
                        {
                            "color": "blue",
                            "seconds": 3435.814
                        }
                    ]
                },
                {
                    "eventType": "25 Entries",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 72.181
                        },
                        {
                            "color": "blue",
                            "seconds": 163.936
                        },
                        {
                            "color": "blue",
                            "seconds": 207.129
                        },
                        {
                            "color": "blue",
                            "seconds": 284.173
                        },
                        {
                            "color": "blue",
                            "seconds": 319.392
                        },
                        {
                            "color": "blue",
                            "seconds": 418.824
                        },
                        {
                            "color": "blue",
                            "seconds": 473.504
                        },
                        {
                            "color": "blue",
                            "seconds": 559.503
                        },
                        {
                            "color": "blue",
                            "seconds": 663.971
                        },
                        {
                            "color": "blue",
                            "seconds": 795.638
                        },
                        {
                            "color": "blue",
                            "seconds": 842.541
                        },
                        {
                            "color": "blue",
                            "seconds": 871.74
                        },
                        {
                            "color": "blue",
                            "seconds": 917.818
                        },
                        {
                            "color": "blue",
                            "seconds": 998.203
                        },
                        {
                            "color": "blue",
                            "seconds": 1034.76
                        },
                        {
                            "color": "blue",
                            "seconds": 1115.263
                        },
                        {
                            "color": "blue",
                            "seconds": 1178.361
                        },
                        {
                            "color": "blue",
                            "seconds": 1240.841
                        },
                        {
                            "color": "blue",
                            "seconds": 1289.58
                        },
                        {
                            "color": "blue",
                            "seconds": 1330.72
                        },
                        {
                            "color": "blue",
                            "seconds": 1396.807
                        },
                        {
                            "color": "blue",
                            "seconds": 1515.56
                        },
                        {
                            "color": "blue",
                            "seconds": 1562.879
                        },
                        {
                            "color": "blue",
                            "seconds": 1644.12
                        },
                        {
                            "color": "blue",
                            "seconds": 1661.662
                        },
                        {
                            "color": "blue",
                            "seconds": 1717.72
                        },
                        {
                            "color": "blue",
                            "seconds": 1781.34
                        },
                        {
                            "color": "blue",
                            "seconds": 1845.241
                        },
                        {
                            "color": "blue",
                            "seconds": 1943.028
                        },
                        {
                            "color": "blue",
                            "seconds": 1969.98
                        },
                        {
                            "color": "blue",
                            "seconds": 2100.621
                        },
                        {
                            "color": "blue",
                            "seconds": 2164.805
                        },
                        {
                            "color": "blue",
                            "seconds": 2224.184
                        },
                        {
                            "color": "blue",
                            "seconds": 2278.984
                        },
                        {
                            "color": "blue",
                            "seconds": 2308.925
                        },
                        {
                            "color": "blue",
                            "seconds": 2321.728
                        },
                        {
                            "color": "blue",
                            "seconds": 2359.885
                        },
                        {
                            "color": "blue",
                            "seconds": 2409.285
                        },
                        {
                            "color": "blue",
                            "seconds": 2461.926
                        },
                        {
                            "color": "blue",
                            "seconds": 2499.165
                        },
                        {
                            "color": "blue",
                            "seconds": 2520.605
                        },
                        {
                            "color": "blue",
                            "seconds": 2596.604
                        },
                        {
                            "color": "blue",
                            "seconds": 2626.65
                        },
                        {
                            "color": "blue",
                            "seconds": 2643.851
                        },
                        {
                            "color": "blue",
                            "seconds": 2675.454
                        },
                        {
                            "color": "blue",
                            "seconds": 2722.045
                        },
                        {
                            "color": "blue",
                            "seconds": 2954.53
                        },
                        {
                            "color": "blue",
                            "seconds": 3057.74
                        },
                        {
                            "color": "blue",
                            "seconds": 3149.205
                        },
                        {
                            "color": "blue",
                            "seconds": 3243.594
                        },
                        {
                            "color": "blue",
                            "seconds": 3310.32
                        },
                        {
                            "color": "blue",
                            "seconds": 3376.325
                        },
                        {
                            "color": "blue",
                            "seconds": 3410.874
                        },
                        {
                            "color": "blue",
                            "seconds": 3499.465
                        },
                        {
                            "color": "blue",
                            "seconds": 3606.454
                        },
                        {
                            "color": "blue",
                            "seconds": 3636.518
                        },
                        {
                            "color": "blue",
                            "seconds": 3676.143
                        },
                        {
                            "color": "blue",
                            "seconds": 3728.994
                        },
                        {
                            "color": "blue",
                            "seconds": 3751.694
                        },
                        {
                            "color": "blue",
                            "seconds": 3913.354
                        },
                        {
                            "color": "blue",
                            "seconds": 3981.432
                        },
                        {
                            "color": "blue",
                            "seconds": 4093.466
                        },
                        {
                            "color": "blue",
                            "seconds": 4153.235
                        }
                    ]
                },
                {
                    "eventType": "Other",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 141.024
                        },
                        {
                            "color": "blue",
                            "seconds": 196.106
                        },
                        {
                            "color": "blue",
                            "seconds": 260.704
                        },
                        {
                            "color": "blue",
                            "seconds": 296.916
                        },
                        {
                            "color": "blue",
                            "seconds": 521.044
                        },
                        {
                            "color": "blue",
                            "seconds": 634.184
                        },
                        {
                            "color": "blue",
                            "seconds": 737.8
                        },
                        {
                            "color": "blue",
                            "seconds": 751.164
                        },
                        {
                            "color": "blue",
                            "seconds": 830.88
                        },
                        {
                            "color": "blue",
                            "seconds": 888.66
                        },
                        {
                            "color": "blue",
                            "seconds": 898.079
                        },
                        {
                            "color": "blue",
                            "seconds": 905.7
                        },
                        {
                            "color": "blue",
                            "seconds": 952.38
                        },
                        {
                            "color": "blue",
                            "seconds": 1106.4
                        },
                        {
                            "color": "blue",
                            "seconds": 1133.94
                        },
                        {
                            "color": "blue",
                            "seconds": 1171.798
                        },
                        {
                            "color": "blue",
                            "seconds": 1212.708
                        },
                        {
                            "color": "blue",
                            "seconds": 1260.72
                        },
                        {
                            "color": "blue",
                            "seconds": 1278.84
                        },
                        {
                            "color": "blue",
                            "seconds": 1314.265
                        },
                        {
                            "color": "blue",
                            "seconds": 1370.54
                        },
                        {
                            "color": "blue",
                            "seconds": 1382.84
                        },
                        {
                            "color": "blue",
                            "seconds": 1440.552
                        },
                        {
                            "color": "blue",
                            "seconds": 1487.009
                        },
                        {
                            "color": "blue",
                            "seconds": 1567.844
                        },
                        {
                            "color": "blue",
                            "seconds": 1602.976
                        },
                        {
                            "color": "blue",
                            "seconds": 1635.04
                        },
                        {
                            "color": "blue",
                            "seconds": 1697.044
                        },
                        {
                            "color": "blue",
                            "seconds": 1740.32
                        },
                        {
                            "color": "blue",
                            "seconds": 1809.949
                        },
                        {
                            "color": "blue",
                            "seconds": 1995.391
                        },
                        {
                            "color": "blue",
                            "seconds": 2016.781
                        },
                        {
                            "color": "blue",
                            "seconds": 2204.925
                        },
                        {
                            "color": "blue",
                            "seconds": 2240.885
                        },
                        {
                            "color": "blue",
                            "seconds": 2249.786
                        },
                        {
                            "color": "blue",
                            "seconds": 2448.978
                        },
                        {
                            "color": "blue",
                            "seconds": 2486.088
                        },
                        {
                            "color": "blue",
                            "seconds": 2517.365
                        },
                        {
                            "color": "blue",
                            "seconds": 2542.156
                        },
                        {
                            "color": "blue",
                            "seconds": 2584.285
                        },
                        {
                            "color": "blue",
                            "seconds": 2679.18
                        },
                        {
                            "color": "blue",
                            "seconds": 2709.764
                        },
                        {
                            "color": "blue",
                            "seconds": 2717.445
                        },
                        {
                            "color": "blue",
                            "seconds": 2747.566
                        },
                        {
                            "color": "blue",
                            "seconds": 2800.672
                        },
                        {
                            "color": "blue",
                            "seconds": 3278.853
                        },
                        {
                            "color": "blue",
                            "seconds": 3335.32
                        },
                        {
                            "color": "blue",
                            "seconds": 3449.019
                        },
                        {
                            "color": "blue",
                            "seconds": 3547.454
                        },
                        {
                            "color": "blue",
                            "seconds": 3657.974
                        },
                        {
                            "color": "blue",
                            "seconds": 3759.761
                        },
                        {
                            "color": "blue",
                            "seconds": 3813.143
                        },
                        {
                            "color": "blue",
                            "seconds": 3888.994
                        },
                        {
                            "color": "blue",
                            "seconds": 3923.936
                        },
                        {
                            "color": "blue",
                            "seconds": 4203.429
                        },
                        {
                            "color": "blue",
                            "seconds": 4224.443
                        }
                    ]
                },
                {
                    "eventType": "Circle Entries",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 167.609
                        },
                        {
                            "color": "blue",
                            "seconds": 213.961
                        },
                        {
                            "color": "blue",
                            "seconds": 289.564
                        },
                        {
                            "color": "blue",
                            "seconds": 423.605
                        },
                        {
                            "color": "blue",
                            "seconds": 537.755
                        },
                        {
                            "color": "blue",
                            "seconds": 667.062
                        },
                        {
                            "color": "blue",
                            "seconds": 798.547
                        },
                        {
                            "color": "blue",
                            "seconds": 845.686
                        },
                        {
                            "color": "blue",
                            "seconds": 925.572
                        },
                        {
                            "color": "blue",
                            "seconds": 1118.565
                        },
                        {
                            "color": "blue",
                            "seconds": 1150.145
                        },
                        {
                            "color": "blue",
                            "seconds": 1293.142
                        },
                        {
                            "color": "blue",
                            "seconds": 1400.34
                        },
                        {
                            "color": "blue",
                            "seconds": 1646.961
                        },
                        {
                            "color": "blue",
                            "seconds": 1722.351
                        },
                        {
                            "color": "blue",
                            "seconds": 1784.18
                        },
                        {
                            "color": "blue",
                            "seconds": 1848.83
                        },
                        {
                            "color": "blue",
                            "seconds": 1974.124
                        },
                        {
                            "color": "blue",
                            "seconds": 2013.528
                        },
                        {
                            "color": "blue",
                            "seconds": 2325.245
                        },
                        {
                            "color": "blue",
                            "seconds": 2372.833
                        },
                        {
                            "color": "blue",
                            "seconds": 2466.746
                        },
                        {
                            "color": "blue",
                            "seconds": 2524.892
                        },
                        {
                            "color": "blue",
                            "seconds": 2599.104
                        },
                        {
                            "color": "blue",
                            "seconds": 2683.146
                        },
                        {
                            "color": "blue",
                            "seconds": 2786.602
                        },
                        {
                            "color": "blue",
                            "seconds": 2932.493
                        },
                        {
                            "color": "blue",
                            "seconds": 3080.127
                        },
                        {
                            "color": "blue",
                            "seconds": 3151.954
                        },
                        {
                            "color": "blue",
                            "seconds": 3246.664
                        },
                        {
                            "color": "blue",
                            "seconds": 3502.794
                        },
                        {
                            "color": "blue",
                            "seconds": 3609.797
                        },
                        {
                            "color": "blue",
                            "seconds": 4157.267
                        },
                        {
                            "color": "blue",
                            "seconds": 4258.775
                        }
                    ]
                },
                {
                    "eventType": "Special",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 235.09
                        },
                        {
                            "color": "blue",
                            "seconds": 278.244
                        },
                        {
                            "color": "blue",
                            "seconds": 391.994
                        },
                        {
                            "color": "blue",
                            "seconds": 556.618
                        },
                        {
                            "color": "blue",
                            "seconds": 618.423
                        },
                        {
                            "color": "blue",
                            "seconds": 645.684
                        },
                        {
                            "color": "blue",
                            "seconds": 689.401
                        },
                        {
                            "color": "blue",
                            "seconds": 839.721
                        },
                        {
                            "color": "blue",
                            "seconds": 941.48
                        },
                        {
                            "color": "blue",
                            "seconds": 961.115
                        },
                        {
                            "color": "blue",
                            "seconds": 1018.18
                        },
                        {
                            "color": "blue",
                            "seconds": 1032.5
                        },
                        {
                            "color": "blue",
                            "seconds": 1096.621
                        },
                        {
                            "color": "blue",
                            "seconds": 1236.521
                        },
                        {
                            "color": "blue",
                            "seconds": 1310.845
                        },
                        {
                            "color": "blue",
                            "seconds": 1333.001
                        },
                        {
                            "color": "blue",
                            "seconds": 1360.62
                        },
                        {
                            "color": "blue",
                            "seconds": 1595.561
                        },
                        {
                            "color": "blue",
                            "seconds": 1642.14
                        },
                        {
                            "color": "blue",
                            "seconds": 1666.52
                        },
                        {
                            "color": "blue",
                            "seconds": 1713.74
                        },
                        {
                            "color": "blue",
                            "seconds": 1927.441
                        },
                        {
                            "color": "blue",
                            "seconds": 1957.22
                        },
                        {
                            "color": "blue",
                            "seconds": 2034.18
                        },
                        {
                            "color": "blue",
                            "seconds": 2365.064
                        },
                        {
                            "color": "blue",
                            "seconds": 2386.845
                        },
                        {
                            "color": "blue",
                            "seconds": 2429.417
                        },
                        {
                            "color": "blue",
                            "seconds": 2594.405
                        },
                        {
                            "color": "blue",
                            "seconds": 2696.838
                        },
                        {
                            "color": "blue",
                            "seconds": 2761.945
                        },
                        {
                            "color": "blue",
                            "seconds": 3099.753
                        },
                        {
                            "color": "blue",
                            "seconds": 3175.934
                        },
                        {
                            "color": "blue",
                            "seconds": 3533.474
                        },
                        {
                            "color": "blue",
                            "seconds": 3693.474
                        },
                        {
                            "color": "blue",
                            "seconds": 3824.834
                        },
                        {
                            "color": "blue",
                            "seconds": 4017.154
                        }
                    ]
                },
                {
                    "eventType": "Umpire",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 426.364
                        },
                        {
                            "color": "blue",
                            "seconds": 509.139
                        },
                        {
                            "color": "blue",
                            "seconds": 1385.72
                        },
                        {
                            "color": "blue",
                            "seconds": 1391.041
                        },
                        {
                            "color": "blue",
                            "seconds": 1479.035
                        },
                        {
                            "color": "blue",
                            "seconds": 1814.341
                        },
                        {
                            "color": "blue",
                            "seconds": 2232.385
                        },
                        {
                            "color": "blue",
                            "seconds": 3555.634
                        },
                        {
                            "color": "blue",
                            "seconds": 3717.053
                        },
                        {
                            "color": "blue",
                            "seconds": 3956.594
                        },
                        {
                            "color": "blue",
                            "seconds": 4255.723
                        }
                    ]
                },
                {
                    "eventType": "Shots",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 670.194
                        },
                        {
                            "color": "blue",
                            "seconds": 801.419
                        },
                        {
                            "color": "blue",
                            "seconds": 1000.924
                        },
                        {
                            "color": "blue",
                            "seconds": 1852.36
                        },
                        {
                            "color": "blue",
                            "seconds": 1892.3
                        },
                        {
                            "color": "blue",
                            "seconds": 1979.253
                        },
                        {
                            "color": "blue",
                            "seconds": 2327.504
                        },
                        {
                            "color": "blue",
                            "seconds": 3801.519
                        },
                        {
                            "color": "blue",
                            "seconds": 4262.372
                        }
                    ]
                },
                {
                    "eventType": "Green",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 2986.514
                        },
                        {
                            "color": "blue",
                            "seconds": 3566.654
                        }
                    ]
                },
                {
                    "eventType": "Yellow",
                    "events": [
                        {
                            "color": "blue",
                            "seconds": 4067.714
                        }
                    ]
                }
            ],
            "buttonConfiguration": [
                {
                    "identifier": "4",
                    "eventType": "Press",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "11",
                    "eventType": "Yellow",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "14",
                    "eventType": "Goal",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "17",
                    "eventType": "Green",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "20",
                    "eventType": "Circle Entries",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "25",
                    "eventType": "Shots",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "31",
                    "eventType": "APC",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "36",
                    "eventType": "Other",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "40",
                    "eventType": "25 Entries",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "44",
                    "eventType": "Outlet",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "51",
                    "eventType": "Red",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "54",
                    "eventType": "Umpire",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                },
                {
                    "identifier": "57",
                    "eventType": "Special",
                    "color": "blue",
                    "leadSeconds": 10,
                    "lagSeconds": 10
                }
            ],
            media: {
                src: "https://codingtoolproto.blob.core.windows.net/asset-883ab032-7cb1-4d85-b6fb-e882a8c8ae2d/R25_GF_SHCvAHC_FullGame_1920x1080_AACAudio_5690.mp4?sv=2015-07-08&sr=c&si=3701f404-eb15-4ab8-8b7d-4a2648be8db7&sig=lXNXI3xytOuT7fWayOOcTdZqBYW3m5H%2B2d0oCaxaZqI%3D&st=2017-11-28T20%3A57%3A26Z&se=2117-11-28T20%3A57%3A26Z",
                type: "video/mp4",
                offlineSrc: ""
            },
            "identifier": "4"
        } as IMatchMetadata
    ]
}
