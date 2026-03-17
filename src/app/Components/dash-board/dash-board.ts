import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StudentList } from '../student-list/student-list';
import { StudentGrade } from '../student-grade/student-grade';
import { AddStudent } from "../add-student/add-student";
import { StudentStats } from '../student-stats/student-stats';
import { StudentService } from '../../Services/student-service';
/**
 * @class DashBoard
 * @description 
 * Acts as the primary layout shell and navigation controller for the application.
 * This component manages the conditional rendering of different application modules 
 * (Home, Student List, Grades, Add/Update, and Stats) using a state-based view switcher.
 * * @property {StudentService} stdService - Injected service used to access global student data for the dashboard summary.
 * @property {string} crrView - Tracks the currently active view identifier (defaults to "home").
 * * @method setView - Updates the active view state to transition between different feature components.
 */
@Component({
  selector: 'app-dash-board',
  imports: [StudentList, StudentGrade, AddStudent, StudentStats],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {
  stdService = inject(StudentService);
  crrView : string = "home";

  setView(viewName: string){
    this.crrView = viewName;
  }
}
