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
    }
    ValueSection.prototype.set = function () {
        var _this = this;
        this.http.post('/setRedisValue', { key: this.currentKey, db: this.currentDatabase, value: JSON.stringify(this.textAreaValue) }).subscribe(function (data) {
            _this.currentValue = data.json().result;
        });
    };
    ValueSection.prototype.textAreaChange = function (event) {
        this.textAreaValue = event.target.value;
    };
    return ValueSection;
}());
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
ValueSection = __decorate([
    core_1.Component({
        selector: 'value-section',
        template: "\n\t\t<div>\n\t\t\t<textarea rows=\"10\" cols=\"40\" value=\"{{currentValue}}\" (change)=\"textAreaChange($event)\"></textarea>\n\t\t</div>\n\t\t<div>\n\t\t\t<button style=\"float: right;\" type=\"button\" class=\"btn btn-primary\" (click)=\"set()\">Save</button>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ValueSection);
exports.ValueSection = ValueSection;
//# sourceMappingURL=value-section.js.map