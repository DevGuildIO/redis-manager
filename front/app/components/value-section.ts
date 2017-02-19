import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// import template from './value-section.html';

@Component({
    selector: 'value-section',
	template: `
		<div>
			<textarea rows="10" cols="40" value="{{currentValue}}" (change)="textAreaChange($event)"></textarea>
		</div>
		<div>
			<button style="float: right;" type="button" class="btn btn-primary" (click)="set()">Save</button>
		</div>
	`
})
export class ValueSection {
	@Input('currentValue') currentValue;
	@Input('currentKey') currentKey;
	@Input('currentDatabase') currentDatabase;
    textAreaValue;
    constructor(private http: Http) { 
    }

    set() {
        this.http.post('/setRedisValue', {key: this.currentKey, db: this.currentDatabase, value: JSON.stringify(this.textAreaValue)}).subscribe((data)=>{
            this.currentValue = data.json().result;
        });
    }

    textAreaChange(event) {
        this.textAreaValue = event.target.value;
    }
 
}