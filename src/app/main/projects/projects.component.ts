import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectModalComponent } from '../new-project-modal/new-project-modal.component'
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentUser: any = {};
  projects: any[] = [];
  projectColors: string[] = ['#90FF33', '#FF33E6', '#FFB833', '#FFFF33', '#335EFF', '#581845', '#FFC300', '#C70039'];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
      this.fetchUserData();
      this.fetchProjectsForUser();
    }

  openNewProjectModal() {
    
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '823px',
      height: '465px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data && data.success) {
      this.fetchProjectsForUser();
      }
    })
  }

  fetchUserData() {
    this.userService.getUserData().subscribe(
      (response) => {
        this.currentUser = response.data;
        console.log(response)
      },
      (error) => {
        console.error('Error while fetching userData:', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  fetchProjectsForUser() {
    this.projectService.getProjectsForUser().subscribe(
      (response) => {
        this.projects = response.data;
        console.log(response)
      },
      (error) => {
        console.error('Error while fetching projects:', error);
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }

  openBugsComponent(projectId: number) {
    this.router.navigate(['/bugs'], { state: { projectId: projectId } });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  data = [
    { 
      image: 'assets/images/ph_android-logo.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/ph_dribbble-logo.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/material-symbols_video-camera-back-outline-rounded.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder1.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder2.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/ph_android-logo.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/ph_dribbble-logo.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/material-symbols_video-camera-back-outline-rounded.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder1.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    { 
      image: 'assets/images/Folder2.png',
      title: 'Android UI System',
      description: 'Redesign all the web pages with animation.',
      tasksDone: '02/56'
    },
    
  ];

}
