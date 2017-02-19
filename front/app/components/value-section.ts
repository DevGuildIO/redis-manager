import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// import template from './value-section.html';

@Component({
    selector: 'value-section',
	template: `
        <div class="row">
            <button *ngIf="!setNewKey" style="float: right;" type="button" class="btn btn-primary" (click)="setNewKey = true;">Create new Key</button>
            <button *ngIf="setNewKey" style="float: right;" type="button" class="btn btn-primary" (click)="setNewKey = false;">Hide</button>
        </div>
        <div class="row">
            <div *ngIf="setNewKey">
                <div>
                    <label>Key:</label><input type="text" [(ngModel)]="newKey" name="key">
                    <label>Database</label>
                    <select [(ngModel)]="newKeyDB">
                        <option *ngFor="let index of databaseKeys">{{index}}</option>
                    </select>
                </div>
                <label>Value:</label>
                <textarea rows="10" cols="40" (change)="textAreaChange($event, 'newValue')"></textarea>
                <button style="float: right;" type="button" class="btn btn-primary" (click)="set(newKey, newValue, newKeyDB)">Save</button>
            </div>
        </div>
		<div class="row">
            <label>Key:</label>
            <p>{{currentKey}}</p>
			<textarea rows="10" cols="40" value="{{currentValue}}" (change)="textAreaChange($event, 'changeValue')"></textarea>
		</div>
		<div>
			<button style="float: right;" type="button" class="btn btn-primary" (click)="set(currentKey, changeValue, currentDatabase)">Save</button>
		</div>
	`
})
export class ValueSection {
	@Input('databaseKeys') databaseKeys;
	@Input('currentValue') currentValue;
	@Input('currentKey') currentKey;
	@Input('currentDatabase') currentDatabase;
    @Output('keyOrValueChange') keyOrValueChange = new EventEmitter();
    textAreaValue;
    newKey;
    newKeyDB = 0;
    constructor(private http: Http) {

    }

    set(key, value, db) {
        value = JSON.stringify(value);
        this.http.post('/setRedisValue', {key: key, value: value, db: db}).subscribe((data)=>{
            if(key === 'newKey') this.newKey = '';
            this.keyOrValueChange.emit(db);
        });
    }

    textAreaChange(event, key) {
        this[key] = event.target.value;
    }
 
}