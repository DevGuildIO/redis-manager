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
// import template from './value-section.html';
var ValueSection = (function () {
    function ValueSection(http) {
        this.http = http;
        this.keyOrValueChange = new core_1.EventEmitter();
        this.newKeyDB = 0;
    }
    ValueSection.prototype.set = function (key, value, db) {
        var _this = this;
        value = JSON.stringify(value, null, 4);
        this.http.post('/setRedisValue', { key: key, value: value, db: db }).subscribe(function (data) {
            if (key === 'newKey')
                _this.newKey = '';
            _this.keyOrValueChange.emit(db);
        });
    };
    ValueSection.prototype.textAreaChange = function (event, key) {
        this[key] = event.target.value;
    };
    return ValueSection;
}());
__decorate([
    core_1.Input('databaseKeys'),
    __metadata("design:type", Object)
], ValueSection.prototype, "databaseKeys", void 0);
__decorate([
    core_1.Input('currentValue'),
    __metadata("design:type", Object)
], ValueSection.prototype, "currentValue", void 0);
__decorate([
    core_1.Input('currentKey'),
    __metadata("design:type", Object)
], ValueSection.prototype, "currentKey", void 0);
__decorate([
    core_1.Input('currentDatabase'),
    __metadata("design:type", Object)
], ValueSection.prototype, "currentDatabase", void 0);
__decorate([
    core_1.Output('keyOrValueChange'),
    __metadata("design:type", Object)
], ValueSection.prototype, "keyOrValueChange", void 0);
ValueSection = __decorate([
    core_1.Component({
        selector: 'value-section',
        template: "\n        <div class=\"row\">\n            <button *ngIf=\"!setNewKey\" style=\"float: right;\" type=\"button\" class=\"btn btn-primary\" (click)=\"setNewKey = true;\">Create new Key</button>\n            <button *ngIf=\"setNewKey\" style=\"float: right;\" type=\"button\" class=\"btn btn-primary\" (click)=\"setNewKey = false;\">Hide</button>\n        </div>\n        <div class=\"row\">\n            <div *ngIf=\"setNewKey\">\n                <div>\n                    <label>Key:</label><input type=\"text\" [(ngModel)]=\"newKey\" name=\"key\">\n                    <label>Database</label>\n                    <select [(ngModel)]=\"newKeyDB\">\n                        <option *ngFor=\"let index of databaseKeys\">{{index}}</option>\n                    </select>\n                </div>\n                <label>Value:</label>\n                <textarea rows=\"10\" cols=\"40\" (change)=\"textAreaChange($event, 'newValue')\"></textarea>\n                <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary\" (click)=\"set(newKey, newValue, newKeyDB)\">Save</button>\n            </div>\n        </div>\n\t\t<div class=\"row\">\n            <label>Key:</label>\n            <p>{{currentKey}}</p>\n\t\t\t<textarea rows=\"10\" cols=\"40\" value=\"{{currentValue}}\" (change)=\"textAreaChange($event, 'changeValue')\"></textarea>\n\t\t</div>\n\t\t<div>\n\t\t\t<button style=\"float: right;\" type=\"button\" class=\"btn btn-primary\" (click)=\"set(currentKey, changeValue, currentDatabase)\">Save</button>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ValueSection);
exports.ValueSection = ValueSection;
//# sourceMappingURL=value-section.js.map