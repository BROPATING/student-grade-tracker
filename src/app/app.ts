import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentCard } from "./Components/student-card/student-card";
import { StudentList } from "./Components/student-list/student-list";
import { DashBoard } from "./Components/dash-board/dash-board";

@Component({
  selector: 'app-root',
  imports: [DashBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('StudentGradeTracker');
}
