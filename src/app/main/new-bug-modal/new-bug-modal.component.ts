import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { BugService } from 'src/app/services/bug.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-bug-modal',
  templateUrl: './new-bug-modal.component.html',
  styleUrls: ['./new-bug-modal.component.css']
})
export class NewBugModalComponent implements OnInit {

  showMenu: boolean = false;
  projectId: any;
  newBugForm: FormGroup;
  errorMessage: string = '';
  developers: any[] = [];
  deadline: FormControl;
  minDate: Date;
  statusOptions: string[] = ['new', 'started', 'resolved'];
  selectedImage: File | null = null;

  constructor(
    private bugService: BugService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewBugModalComponent>,
    private _snackBar: MatSnackBar
    ) {
      this.newBugForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        deadline: [''],
        bug_type: [''],
        status: [''],
        developer_user_id: ['']
      });

      this.deadline = new FormControl(new Date());
      this.minDate = new Date();
    }

  ngOnInit() {
    this.projectId = this.sharedService.projectId;
    console.log('Received projectId:', this.projectId);
    this.fetchDevelopers();

    this.newBugForm.get('bug_type')?.valueChanges.subscribe(() => {
      this.newBugForm.get('status')?.setValue(null);
    });
  }

  handleImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0] as File;
    }
  }

  initializeStatusOptions(bugType: string) {
    if (bugType === 'bug') {
      this.statusOptions = ['new', 'started', 'resolved'];
    } else if (bugType === 'feature') {
      this.statusOptions = ['new', 'started', 'completed'];
    }
  }

  fetchDevelopers() {
    this.bugService.getDevelopersForBug().subscribe(
      (response) => {
        this.developers = response.data;
        console.log(response);
      },
      (error) => {
        console.log('error', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  selectDeveloper(developer: any) {
    this.newBugForm.get('developer_user_id')?.patchValue(developer.user_id);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onSubmit() {
    if (this.newBugForm.valid) {

      const formData = this.newBugForm.value;
      formData.project_id = this.projectId;
      formData.screen_shot = this.selectedImage;

      console.log(formData)

      this.bugService.createBug(formData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('response', response);
            this.dialogRef.close({success: true});
            this.openSnackBar('Bug created successfully', 'Close');
          } else {
            this.errorMessage = 'Error!! while creating bug. Please try again.';
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
