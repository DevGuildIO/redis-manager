import { Component, HostListener } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <span>Databases:</span>
                    <div *ngFor="let database of databaseKeys; let i = index;">
                        <span (click)="toggle(i)">{{i}} [{{databases[database].length}}]</span> 
                        <button (click)="fetchDb(i)">Refresh</button>
                        <button *ngIf="databases[database].length > 0" type="button" class="btn btn-danger" (click)="deleteSelection(0, databases[database].length-1, database)">Flush DB</button>
                        <div *ngIf="visibleDatabase === i">
                            <div *ngFor="let key of databases[database]; let j = index;">
                                <div class="key-row" [class.selected]="j <= end && j >= start">
                                    <button (click)="get(key, i, $event)" type="button" class="btn btn-link">{{key}}</button>
                                    <button style="float: right;" type="button" class="btn btn-danger" (click)="delete(key)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6" id="value-section">
                    <value-section [currentValue]="currentValue" [currentKey]="currentKey" [currentDatabase]="visibleDatabase" [databaseKeys]="databaseKeys" (keyOrValueChange)="fetchDb($event)"></value-section>
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-danger" (click)="deleteSelection(start, end, visibleDatabase)">Delete Selected</button>
            </div>
        </div>
    `,
    styles: ['.row, .key-row { padding-top: 5px; }', '.selected {background-color: #C0C0C0}', '#value-section { position: fixed; top: 0px; left: 50%;}']
})
export class AppComponent {
    databases: Object;
    databaseKeys: Array<Object>;
    visibleDatabase = 0;
    currentValue;
    currentKey;
    textAreaValue;
    start;
    end;
    constructor(private http: Http) { 
        this.fetch();
    }

    /**
     * Fetchs all of the databases and their keys
     */
    fetch() {
        this.http.get('/getDbsAndKeys').subscribe((data) => {
            this.databases = data.json().keys;
            this.databaseKeys = Object.keys(this.databases);
        });
    }

    /**
     * @dbIndex     {Integer}   
     * Takes in the index of a database and fetchs all of the keys for that database
     */
    fetchDb(dbIndex) {
        this.http.get('/getDatabaseKeys?db=' + dbIndex).subscribe((data) => {
            this.databases[dbIndex] = data.json().keys;
        });
    }

    /**
     * @dbIndex     {Integer}  
     * Marks the index passed in as the visibleDatabase, if it already is then it hides it and marks none as visible
     */
    toggle(dbIndex) {
        if(this.visibleDatabase == dbIndex) {
            this.visibleDatabase = undefined;
            return;
        }
        this.visibleDatabase = dbIndex;
    }

    /**
     * @key     {String}
     * Deletes the key and value based on the key passed in from the current database
     */
    delete(key) {
        this.http.post('/removeRedisKey', {keys: [key], db: this.visibleDatabase}).subscribe(()=>{
            this.fetchDb(this.visibleDatabase);
        });
    }

    /**
     * Deletes the selection of keys from the current database
     */
    deleteSelection(start, end, db) {
        let keys = this.databases[db].slice(start, end+1);
        this.http.post('/removeRedisKey', {keys: keys, db:db}).subscribe(()=>{
            this.start = undefined;
            this.end = undefined;
            this.fetch();
        });
    }

    /**
     * @key     {String}
     * @dbIndex {Integer}
     * @event   {KeyStroke}
     * Get the value for the key passed in from the database of the database index passed in
     * @return JSON
     */
    get(key, dbIndex, event) {
        if(event.shiftKey) {
            this.checkSelection(key, dbIndex);
        }
        this.currentKey = key;
        this.visibleDatabase = dbIndex;
        this.http.post('/getRedisValue', {key: key, db: dbIndex}).subscribe((data)=>{
            this.currentValue =  JSON.stringify(data.json().result, null, 4);
        });
    }

    /**
     * @key     {String}
     * @dbIndex {Integer}
     * Sets the selection start and end for a user shift clicking keys
     */
    checkSelection(key, dbIndex) {
        let start = this.databases[dbIndex].indexOf(this.currentKey);
        let end = this.databases[dbIndex].indexOf(key);
        //This is to handle a user clicking the first item that is below (or after) the second item
        if(end - start < 0) {
            this.start = end;
            this.end = start;
        } else {
            this.start = start;
            this.end = end;
        }
    }
 
}