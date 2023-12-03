import {Component, OnInit} from '@angular/core';
import {Resource} from "@angular/compiler-cli/src/ngtsc/metadata";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceAuthService} from "../../../resource-services/resource-auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  courseId: number;

  resourceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
    file: new FormControl('', Validators.required)
  });

  ngOnInit(){
    this.courseId = +this.route.snapshot.params['courseId'];
  }
  constructor(private resourceAuth: ResourceAuthService, private route: ActivatedRoute) {
  }

  onFileChange({event}: { event: any }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.resourceForm.patchValue({
        file: file
      });
    }
  }

  onSubmit() {
    if (this.resourceForm.valid) {
      const formData = new FormData();
      formData.append('name', this.resourceForm.get('name')?.value ?? '');
      formData.append('type', this.resourceForm.get('type')?.value ?? '');
      formData.append('year', this.resourceForm.get('year')?.value ?? '');
      formData.append('file', this.resourceForm.get('file')?.value ?? '');

      this.resourceAuth.addResource(this.courseId, formData).subscribe(response => {
        console.log(response);
        // Handle response here
      });
    }
  }
}
