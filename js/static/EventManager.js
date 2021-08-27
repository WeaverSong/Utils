"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventManager_instances, _EventManager_tick;
/*

    Handles events. All methods return a boolean of whether they succeeded.

*/
class EventManager {
    constructor(events = [], doTick = true) {
        _EventManager_instances.add(this);
        //Prepare a blank queue.
        this.Queue = {
            preTick: {
                queue: [],
                condition: () => true
            },
            tick: {
                queue: [],
                condition: () => true
            },
            postTick: {
                queue: [],
                condition: () => true
            }
        };
        //Add an array of events
        events.forEach(i => this.addEvent(i.name, i.condition));
        //Call the tick function
        if (doTick)
            this.startTick();
    }
    //Fires an event with an optional trigger object.
    fire(event, triggers = {}) {
        //Return false if the event doesn't exist.
        if (this.Queue[event] === undefined)
            return false;
        this.Queue[event].queue.forEach(ele => {
            //If the event's condition function accepts the element, call its function.
            if (this.Queue[event].condition(ele, triggers)) {
                ele.func(triggers);
            }
        });
        return true;
    }
    ;
    //Subscribes to a specified event.
    subscribe(source, event, func) {
        //Fail if there was something wrong with the event or inputs
        if (typeof (func) !== "function"
            || this.Queue[event] === undefined
            || this.Queue[event].queue === undefined
            || typeof (source) !== "object")
            return false;
        this.Queue[event].queue.push({ func: func, source: source });
        return true;
    }
    ;
    //Removes your subscriptions, or only for one event if specified
    unSubscribe(source, event) {
        //If event is undefined, we want to unsubscribe from all events
        if (event === undefined) {
            for (let key in this.Queue) {
                this.Queue[key].queue.forEach((ele, index) => {
                    if (ele.source === source) {
                        this.Queue[key].queue.splice(index, 1);
                    }
                });
            }
            return true;
        }
        else {
            //Fail if there was something wrong with the event or inputs
            if (this.Queue[event] == undefined
                || this.Queue[event].queue === undefined
                || typeof (source) !== 'object')
                return false;
            //Remove the subscribed function
            let Event = this.Queue[event].queue;
            let thing = Event.find(i => i.source === source);
            //If we failed to remove it, return false;
            if (thing === undefined)
                return false;
            let temp = Event.splice(Event.indexOf(thing), 1);
            return true;
        }
    }
    ;
    //Clears the specified event, or all events if none was specified.
    clearEvent(event) {
        if (event === undefined) {
            this.Queue = {
                preTick: {
                    queue: [],
                    condition: () => true
                },
                tick: {
                    queue: [],
                    condition: () => true
                },
                postTick: {
                    queue: [],
                    condition: () => true
                }
            };
        }
        else if (this.Queue[event] !== undefined
            && this.Queue[event].queue !== undefined) {
            this.Queue[event].queue = [];
        }
        else {
            return false;
        }
        return true;
    }
    ;
    //Adds a new event.
    addEvent(name, condition) {
        this.Queue[name] = {
            queue: [],
            condition
        };
        return true;
    }
    ;
    //Removes an event
    removeEvent(name) {
        if (this.Queue[name] === undefined)
            return false;
        delete this.Queue[name];
        return true;
    }
    ;
    ;
    stopTick() {
        if (this.tick === undefined)
            return false;
        cancelAnimationFrame(this.tick);
        return true;
    }
    ;
    startTick() {
        if (this.tick !== undefined)
            return false;
        this.tick = requestAnimationFrame(e => __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_tick).call(this, e));
        return true;
    }
}
_EventManager_instances = new WeakSet(), _EventManager_tick = function _EventManager_tick(e) {
    try {
        this.fire('preTick');
        this.fire('tick');
        this.fire('postTick');
        this.tick = requestAnimationFrame(e => __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_tick).call(this, e));
    }
    catch (e) {
        console.error("Tick function failed.", e);
    }
};
;
