"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCache = void 0;
class DataCache {
    constructor(fetchFunction, minutesToLive = 10) {
        this.millisecondsToLive = minutesToLive * 60 * 1000;
        this.fetchFunction = fetchFunction;
        this.cache = null;
        this.getData = this.getData.bind(this);
        this.resetCache = this.resetCache.bind(this);
        this.isCacheExpired = this.isCacheExpired.bind(this);
        this.fetchDate = new Date(0);
    }
    isCacheExpired() {
        return (this.fetchDate.getTime() + this.millisecondsToLive < new Date().getTime());
    }
    getData() {
        if (!this.cache || this.isCacheExpired()) {
            console.log("expired - fetching new data");
            return this.fetchFunction().then((data) => {
                this.cache = data;
                this.fetchDate = new Date();
                return data;
            });
        }
        else {
            // console.log("cache hit");
            return Promise.resolve(this.cache);
        }
    }
    resetCache() {
        this.fetchDate = new Date(0);
    }
}
exports.DataCache = DataCache;
//# sourceMappingURL=utils.js.map