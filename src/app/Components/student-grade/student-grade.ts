import { Component, inject, OnInit } from '@angular/core';
import { StudentList, } from '../student-list/student-list';
import { Grades } from '../../Shared/studentInterface';
import { StudentService } from '../../Services/student-service';
import { StudentInfo } from '../../Shared/studentInterface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LetterGradePipe } from '../../Pipes/letter-grade-pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { GradeColor } from '../../Directives/grade-color';
import { GpaCalculatorPipe } from '../../Pipes/gpa-calculator-pipe';
/**
 * @description 
 * Manages the academic report view by fetching and filtering student data.
 * This component handles the display of individual grades and overall performance 
 * metrics (GPA and Letter Grades) by coordinating with the StudentService.
 * * @property {StudentService} studentService - Injected service for data operations.
 * @property {string} searchTerm - Data-bound string for filtering the student table.
 * * @method ngOnInit - Lifecycle hook for component initialization.
 * @method filterStudent - Returns a search-filtered list of students from the service.
 * @method calAvg - Computes the arithmetic mean for a specific grade array.
 */
@Component({
  selector: 'app-student-grade',
  imports: [LetterGradePipe, FormsModule, CommonModule, GradeColor, GpaCalculatorPipe],
  templateUrl: './student-grade.html',
  styleUrl: './student-grade.css',
})
export class StudentGrade implements OnInit {
  private studentService = inject(StudentService);
  searchTerm: string = "";
  
  ngOnInit() {
  }

  filterStudent() {
    return this.studentService.getFilteredStudent(this.searchTerm);
  }

  calAvg(grade: any) {
    return this.studentService.calculateAvg(grade);
  }
}
