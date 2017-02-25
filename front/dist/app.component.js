"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.visibleDatabase = 0;
        this.fetch();
    }
    AppComponent.prototype.fetch = function () {
        var _this = this;
        this.http.get('/getDbsAndKeys').subscribe(function (data) {
            _this.databases = data.json().keys;
            _this.databaseKeys = Object.keys(_this.databases);
        });
    };
    AppComponent.prototype.fetchDb = function (dbIndex) {
        var _this = this;
        this.http.get('/getDatabaseKeys?db=' + dbIndex).subscribe(function (data) {
            _this.databases[dbIndex] = data.json().keys;
        });
    };
    AppComponent.prototype.toggle = function (index) {
        if (this.visibleDatabase == index) {
            this.visibleDatabase = undefined;
            return;
        }
        this.visibleDatabase = index;
    };
    AppComponent.prototype.delete = function (key) {
        var _this = this;
        this.http.post('/removeRedisKey', { keys: [key], db: this.visibleDatabase }).subscribe(function () {
            _this.fetchDb(_this.visibleDatabase);
        });
    };
    AppComponent.prototype.deleteAll = function () {
        var _this = this;
        var keys = this.databases[this.visibleDatabase].slice(this.start, this.end + 1);
        this.http.post('/removeRedisKey', { keys: keys, db: this.visibleDatabase }).subscribe(function () {
            _this.fetch();
        });
    };
    AppComponent.prototype.get = function (key, db, event) {
        var _this = this;
        if (event.shiftKey) {
            this.checkSelection(key, db);
        }
        this.currentKey = key;
        this.visibleDatabase = db;
        this.http.post('/getRedisValue', { key: key, db: db }).subscribe(function (data) {
            var result = data.json().result;
            _this.currentValue = data.json().result;
        });
    };
    AppComponent.prototype.checkSelection = function (key, db) {
        var start = this.databases[db].indexOf(this.currentKey);
        var end = this.databases[db].indexOf(key);
        //This is to handle a user clicking the first item that is below (or after) the second item
        if (end - start < 0) {
            this.start = end;
            this.end = start;
        }
        else {
            this.start = start;
            this.end = end;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-6\">\n                    <div *ngFor=\"let database of databaseKeys; let i = index;\">\n                        <span (click)=\"toggle(i)\">{{i}} [{{databases[database].length}}]</span> <button (click)=\"fetchDb(i)\">Refresh</button>\n                        <div *ngIf=\"visibleDatabase === i\">\n                            <div *ngFor=\"let key of databases[database]\">\n                                <div class=\"key-row\">\n                                    <button (click)=\"get(key, i, $event)\" type=\"button\" class=\"btn btn-link\">{{key}}</button>\n                                    <button style=\"float: right;\" type=\"button\" class=\"btn btn-danger\" (click)=\"delete(key)\">Delete</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-6\">\n                    <value-section [currentValue]=\"currentValue\" [currentKey]=\"currentKey\" [currentDatabase]=\"visibleDatabase\" [databaseKeys]=\"databaseKeys\" (keyOrValueChange)=\"fetchDb($event)\"></value-section>\n                </div>\n            </div>\n            <div>\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteAll()\">Delete Selected</button>\n            </div>\n        </div>\n    ",
        styles: ['.row, .key-row { padding-top: 5px; }']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map