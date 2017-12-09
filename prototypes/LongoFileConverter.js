"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var FileConverter = /** @class */ (function () {
    function FileConverter() {
    }
    FileConverter.prototype.Convert = function (input) {
        var properties = this.ProcessProperties(input.Description);
        var buttonConfiguration = this.ProcessButtonConfiguration(input.Dashboard);
        var events = this.ProcessCodedEvents(input.Timeline, buttonConfiguration);
        return {
            userId: '',
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {},
            identifier: ""
        };
    };
    FileConverter.prototype.ProcessButtonConfiguration = function (dashboard) {
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
            return events;
        }
        return [];
    };
    FileConverter.prototype.ProcessCodedEvents = function (timeline, buttons) {
        if (timeline !== undefined && timeline !== null) {
            var codedEventTypes_1 = [];
            var events = timeline.forEach(function (e) {
                var button = buttons.find(function (b) { return b.identifier === e.EventType.$ref; })[0];
                if (button !== undefined) {
                    var item = codedEventTypes_1.find(function (e) { return e.eventType == button.eventType; });
                    if (item === null || item === undefined) {
                        item = {
                            eventType: button.eventType,
                            events: []
                        };
                        codedEventTypes_1.push(item);
                    }
                    item.events.push({
                        color: button.color,
                        seconds: e.EventTime / 1000
                    });
                }
            });
            return codedEventTypes_1.filter(function (e) { return e !== undefined; });
            ;
        }
        return [];
    };
    FileConverter.prototype.ProcessProperties = function (metadata) {
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
    return FileConverter;
}());
// exports.FileConverter = FileConverter;
//# sourceMappingURL=LongoFileConverter.js.map