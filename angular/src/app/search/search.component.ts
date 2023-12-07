import {Component, OnInit} from '@angular/core';
import {ResourceAuthService} from "../modules/resource/resource-services/resource-auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  resources: any[] = [];
  filteredResources: any[] = [];
  searchTerm: string = '';
  filters = { name: false, type: false, year: false, courseName: false };
  constructor(private authResource: ResourceAuthService){}

  ngOnInit() {
    this.authResource.getAllResources().subscribe(
      (data) => {
        // console.log(data);
        this.resources = data.data;
      },
      error => {
        console.error('Error fetching resources', error);
      }
    );
  }
  filterResources() {
    this.filteredResources = this.resources.filter(resource => {
      const inName = this.filters.name ? resource.name.includes(this.searchTerm) : true;
      const inType = this.filters.type ? resource.type.includes(this.searchTerm) : true;
      const inYear = this.filters.year ? resource.year == this.searchTerm : true;
      const inCourseName = this.filters.courseName ? resource.course_name.includes(this.searchTerm) : true;
      return inName && inType && inYear && inCourseName;
    });
  }
}

