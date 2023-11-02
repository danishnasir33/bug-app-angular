import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewBugModalComponent } from '../new-bug-modal/new-bug-modal.component';
import { BugService } from '../../services/bug.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Element {
  description: string;
  status: string;
  developer_user_id: number;
  deadline: Date;
}

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  projectId: any;
  bugs: any[] = [];

  constructor(
    public dialog: MatDialog,
    private bugService: BugService,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.projectId = history.state.projectId;
    this.sharedService.projectId = this.projectId;
    console.log('this.projectId: ',this.projectId)
    this.fetchBugsForProject();
  }

  openNewBugModal() {
    const dialogRef = this.dialog.open(NewBugModalComponent, {
      width: '40%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.success) {
        this.fetchBugsForProject();
      }
    })
  }

  fetchBugsForProject() {
    this.bugService.getBugsForUser({ project_id: this.projectId }).subscribe(
      (response) => {
        this.bugs = response.data;
        console.log(response)
      },
      (error) => {
        console.error('Error while fetching bugs:', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  updateBugStatus(bugId: number, status: string) {
    this.bugService.updateBug(bugId, { status }).subscribe(
      (response) => {
        console.log('Bug updated successfully', response);
        this.fetchBugsForProject();
        this.openSnackBar('Bug updated successfully', 'Close');
      },
      (error) => {
        console.error('An error occurred while updating bug status:', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  deleteBug(bugId: number) {
    this.bugService.deleteBug(bugId).subscribe(
      (response) => {
        console.log('Bug deleted successfully', response);
        this.fetchBugsForProject();
        this.openSnackBar('Bug deleted successfully', 'Close');
      },
      (error) => {
        console.error('An error occurred while deleting the bug:', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  displayedColumns: string[] = ['select', 'description', 'status', 'developer_user_id', 'deadline', 'action'];
}
