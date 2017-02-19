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
var ValueAreaComponent = (function () {
    function ValueAreaComponent() {
        this.valueAreaChange = new core_1.EventEmitter();
    }
    ValueAreaComponent.prototype.textAreaChange = function (event) {
        this.textAreaValue = event.target.value;
    };
    ValueAreaComponent.prototype.keyboardInput = function (event) {
        if (event.keyCode === 13) {
            this.valueAreaChange.emit(this.textAreaValue);
            event.preventDefault();
        }
        console.log(this.currentValue);
    };
    ValueAreaComponent.prototype.set = function () {
        this.valueAreaChange.emit(this.textAreaValue);
    };
    return ValueAreaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ValueAreaComponent.prototype, "valueAreaChange", void 0);
__decorate([
    core_1.Input('currentValue'),
    __metadata("design:type", Object)
], ValueAreaComponent.prototype, "currentValue", void 0);
__decorate([
    core_1.HostListener('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ValueAreaComponent.prototype, "keyboardInput", null);
ValueAreaComponent = __decorate([
    core_1.Component({
        selector: 'value-area',
        template: "\n        <textarea value=\"{{currentValue}}\" (change)=\"textAreaChange($event)\">{{currentValue}}</textarea>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"set()\">Save</button>\n    ",
        inputs: ['currentValue'],
        providers: []
    }),
    __metadata("design:paramtypes", [])
], ValueAreaComponent);
exports.ValueAreaComponent = ValueAreaComponent;
//# sourceMappingURL=valueArea.js.map