import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentInfo } from '../../Shared/studentInterface';
import { FilterByPerformancePipe } from '../../Pipes/filter-by-performance-pipe';
import { StudentCard } from "../student-card/student-card";
import { StudentService } from '../../Services/student-service';
import sutdentStats from '../../Shared/studentInterface';
import { CommonModule, DecimalPipe } from '@angular/common';
/**
 * @class StudentStats
 * @description 
 * Analytical dashboard component that provides a high-level overview of class performance.
 * It visualizes grade distributions using progress bars, highlights top/lowest performers, 
 * and identifies students at academic risk. Additionally, it offers a filtered view 
 * of the student list categorized by performance levels (Excellent, Good, Poor, etc.).
 * * @property {StudentInfo[]} studentList - Local reference to the master student dataset.
 * @property {string} selectedCategory - State variable for filtering the student table by performance tier.
 * @property {StudentService} studentService - Injected service to fetch data and pre-calculated statistics.
 * @property {sutdentStats} stats - Object containing processed metrics like averages and distribution counts.
 * * @method ngOnInit - Lifecycle hook to hydrate the component with student data and statistics upon initialization.
 */
@Component({
  selector: 'app-student-stats',
  imports: [FormsModule, FilterByPerformancePipe, StudentCard, DecimalPipe, CommonModule],
  templateUrl: './student-stats.html',
  styleUrl: './student-stats.css',
})
export class StudentStats implements OnInit{
  studentList : StudentInfo[] = [];
  selectedCategory = "All";

  studentService = inject(StudentService);
  stats !: sutdentStats;
  ngOnInit(): void {
    this.studentList = this.studentService.studentInfo; 
    this.stats = this.studentService.getStats();
  }
}
