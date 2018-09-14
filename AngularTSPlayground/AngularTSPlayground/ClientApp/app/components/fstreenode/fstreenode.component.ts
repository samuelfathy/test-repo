import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FileSystemEntry } from '../../app.shared.module';
import { DataService } from "../../data.service";

@Component({
    selector: 'fs-tree-node',
    templateUrl: './fstreenode.component.html',
    styleUrls: ['./fstreenode.component.css']
})

export class FSTreeNodeComponent {

    @Input() directory: FileSystemEntry;

    childFolders: FileSystemEntry[];
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private dataService: DataService) {
        /*http.get(baseUrl + 'api/FileSystem/GetDrives').subscribe(result => {
            this.systemDrives = result.json() as DriveInfo[];
        }, error => console.error(error));*/
    }

    onExpand(): void {
        this.http.get(this.baseUrl + 'api/FileSystem/GetSubFolders?path=' + this.directory.fullPath).subscribe(result => {
            this.childFolders = result.json() as FileSystemEntry[];
        }, error => console.error(error));
    }

    onSelectFolder(): void {
        this.dataService.changeFolder(this.directory);
    }
}

/*interface DirectoryInfo {
    name: string;
    volumeLabel: string;
}*/