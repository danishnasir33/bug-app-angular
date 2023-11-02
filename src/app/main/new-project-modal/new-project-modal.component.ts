import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css'],
})
export class NewProjectModalComponent {
  newProjectForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewProjectModalComponent>,
    private router: Router,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.newProjectForm = this.fb.group({
      project_name: ['', Validators.required],
      project_description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.newProjectForm.valid) {

      const formData = this.newProjectForm.value;

      console.log(formData)

      this.projectService.createProject(formData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('response', response);
            this.dialogRef.close({success: true});
            this.openSnackBar('Project created successfully', 'Close');
          } else {
            this.errorMessage = 'Error creating project. Please try again.';
            this.openSnackBar(this.errorMessage, 'Close');
          }
        },
        (error) => {
          console.error('An error occurred:', error);
          this.errorMessage = error.error.message;
          this.openSnackBar(this.errorMessage, 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
