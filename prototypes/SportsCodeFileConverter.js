"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SportsCodeFileConverter = /** @class */ (function () {
    function SportsCodeFileConverter() {
    }
    SportsCodeFileConverter.prototype.Convert = function (input) {
        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(input, "text/xml");
        // print the name of the root element or error message
        console.log(oDOM.documentElement.nodeName == "parsererror" ? "error while parsing" : oDOM.documentElement.nodeName);
        var properties = this.ProcessProperties(oDOM);
        var buttonConfiguration = this.ProcessButtonConfiguration(oDOM);
        var events = this.ProcessCodedEvents(oDOM, buttonConfiguration);
        return {
            userId: '',
            properties: properties,
            events: events,
            buttonConfiguration: buttonConfiguration,
            media: {},
            identifier: ""
        };
    };
    SportsCodeFileConverter.prototype.ProcessButtonConfiguration = function (dom) {
        var buttonConfiguration = [];
        if (dom !== undefined && dom !== null) {
            var instances = dom.getElementsByTagName("instance");
            for (var i = 0; i < instances.length; i++) {
                var identifier = instances[i].getElementsByTagName('ID')[0].textContent;
                var code = instances[i].getElementsByTagName('code')[0].textContent;
                buttonConfiguration.push({
                    identifier: identifier,
                    eventType: code,
                    color: "blue",
                    leadSeconds: 5,
                    lagSeconds: 5
                });
            }
        }
        return buttonConfiguration;
    };
    SportsCodeFileConverter.prototype.ProcessCodedEvents = function (dom, buttons) {
        var codedEventTypes = [];
        if (dom !== undefined && dom !== null) {
            var instances = dom.getElementsByTagName("instance");
            var _loop_1 = function (i) {
                var identifier = instances[i].getElementsByTagName('ID')[0].textContent;
                var code = instances[i].getElementsByTagName('code')[0].textContent;
                var start = instances[i].getElementsByTagName('start')[0].textContent;
                var end = instances[i].getElementsByTagName('end')[0].textContent;
                var item = codedEventTypes.find(function (e) { return e.eventType == code; });
                if (item === null || item === undefined) {
                    item = {
                        eventType: code,
                        events: []
                    };
                    codedEventTypes.push(item);
                }
                var seconds = (+start + +end / 2);
                item.events.push({
                    color: 'blue',
                    seconds: seconds
                });
            };
            for (var i = 0; i < instances.length; i++) {
                _loop_1(i);
            }
        }
        return codedEventTypes.filter(function (e) { return e !== undefined; });
        ;
    };
    SportsCodeFileConverter.prototype.ProcessProperties = function (dom) {
        if (dom !== undefined && dom !== null) {
            var properties = {
                awayTeam: '',
                homeTeam: '',
                grade: '',
                year: new Date().getFullYear(),
                matchName: '',
                date: '',
                roundNumber: 0,
                venue: ''
            };
            return properties;
        }
        return {};
    };
    return SportsCodeFileConverter;
}());
exports.SportsCodeFileConverter = SportsCodeFileConverter;
//# sourceMappingURL=SportsCodeFileConverter.js.map