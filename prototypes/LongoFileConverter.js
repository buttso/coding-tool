"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LongoFileConverter = /** @class */ (function () {
    function LongoFileConverter() {
    }
    LongoFileConverter.prototype.Convert = function (input) {
        var properties = this.ProcessProperties(input.Description);
        console.info('got properties');
        var buttonConfiguration = this.ProcessButtonConfiguration(input.Dashboard);
        console.info('got buttons');
        var events = this.ProcessCodedEvents(input.Timeline, buttonConfiguration);
        console.info('got events');
        return {
            userId: '',
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {},
            identifier: ""
        };
    };
    LongoFileConverter.prototype.ProcessButtonConfiguration = function (dashboard) {
        if (dashboard !== undefined && dashboard !== null) {
            var events = dashboard.List.map(function (e) {
                if (e.EventType !== undefined && e.EventType.$id !== undefined) {
                    var identifier = e.EventType.$id;
                    return {
                        identifier: e.EventType.$id,
                        eventType: e.Name,
                        color: "blue",
                        leadSeconds: e.Start / 1000,
                        lagSeconds: e.Stop / 1000
                    };
                }
            });
            return events.filter(function (e) { return e !== undefined; });
        }
        return [];
    };
    LongoFileConverter.prototype.ProcessCodedEvents = function (timeline, buttons) {
        if (timeline !== undefined && timeline !== null) {
            console.info("found timeline: " + timeline.length);
            var codedEventTypes_1 = [];
            var events = timeline.forEach(function (e) {
                console.info("Looking for " + e.EventType.$ref);
                var button = buttons.find(function (b) {
                    try {
                        return b.identifier.toString() == e.EventType.$ref.toString();
                    }
                    catch (_a) {
                        return false;
                    }
                });
                
                if (button !== undefined) {
                    var btn_1 = button;
                    console.info("found button: " + btn_1.eventType);
                    var item = codedEventTypes_1.find(function (e) { return e.eventType == btn_1.eventType; });
                    if (item === null || item === undefined) {
                        item = {
                            eventType: btn_1.eventType,
                            events: []
                        };
                        codedEventTypes_1.push(item);
                    }

                    var s = (e.EventTime / 1000) - button.leadSeconds;
                    item.events.push({
                        color: btn_1.color,
                        seconds: Math.max(s, 0)
                    });
                }
                else {
                    console.info("button was undefined");
                }
            });
            console.info("return 1");
            return codedEventTypes_1.filter(function (e) { return e !== undefined; });
        }
        console.info("return 2");
        return [];
    };
    LongoFileConverter.prototype.ProcessProperties = function (metadata) {
        if (metadata !== undefined && metadata !== null) {
            var properties = {
                awayTeam: metadata.VisitorName,
                homeTeam: metadata.LocalName,
                grade: metadata.Competition,
                year: metadata.Season,
                matchName: metadata.Description,
                date: metadata.MatchDate,
                roundNumber: 1,
                venue: ""
            };
            return properties;
        }
        return {};
    };
    return LongoFileConverter;
}());
exports.LongoFileConverter = LongoFileConverter;
//# sourceMappingURL=LongoFileConverter.js.map