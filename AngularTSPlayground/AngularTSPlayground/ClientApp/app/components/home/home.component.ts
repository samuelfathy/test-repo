import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../../data.service";
import { FileSystemEntry } from '../../app.shared.module';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    currentFolder: FileSystemEntry;

    currentFolderContent: FileSystemEntry[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private dataService: DataService) { }

    ngOnInit() {
        this.dataService.currentFolder.subscribe(currentFolder => {
            this.currentFolder = currentFolder;
            if (this.currentFolder && this.currentFolder.fullPath) {
                this.http.get(this.baseUrl + 'api/FileSystem/GetFolderContent?path=' + this.currentFolder.fullPath).subscribe(result => {
                    this.currentFolderContent = result.json() as FileSystemEntry[];
                }, error => console.error(error));
            }
        });
    }
}
