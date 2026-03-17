import { Component, inject, OnInit } from '@angular/core';
import { StudentInfo } from '../../Shared/studentInterface';
import { StudentCard } from "../student-card/student-card";
import { StudentService } from '../../Services/student-service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
/**
 * @class StudentList
 * @description 
 * Manages the main student directory. This component handles the initial data hydration
 * of the application state and provides real-time search filtering by interfacing 
 * with the StudentService.
 * * @property {StudentService} studentService - Injected service managing global student state.
 * @property {string} searchTerm - Bound search string used to filter the display list.
 * @property {StudentInfo[]} studentLists - Hardcoded fallback dataset for first-time initialization.
 * * @method ngOnInit - Lifecycle hook that checks for existing data and populates the service if empty.
 * @method studentList - Getter that retrieves the current filtered list of students.
 * @method filterStudent - Explicit method to fetch matching students based on search criteria.
 */
@Component({
  selector: 'app-student-list',
  imports: [StudentCard, FormsModule, CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  private studentService = inject(StudentService);
  searchTerm: string = "";

  studentLists: StudentInfo[] = [
    {
      id: 1,
      student_name: "VED",
      email: "ved.sies@gmail.com",
      enrollmentdate: new Date('2023-01-15'),
      grade: [{ subject: 'Math', score: 90 }]
    },
    {
      id: 2,
      student_name: "Dolly",
      email: "dolly23.jnpt@school.edu",
      enrollmentdate: new Date('2023-02-10'),
      grade: [{ subject: 'Math', score: 99 }]
    },
    {
      id: 3,
      student_name: "Kiro",
      email: "kiro.pillai@school.edu",
      enrollmentdate: new Date('2023-03-05'),
      grade: [
        { subject: 'Math', score: 75 },
        { subject: 'Science', score: 88 }
      ]
    },
    {
      id: 4,
      student_name: "Arya",
      email: "arya.rait@school.edu",
      enrollmentdate: new Date('2023-04-01'),
      grade: [
        { subject: 'Math', score: 82 },
        { subject: 'English', score: 72 }
      ]
    },
    {
      id: 5,
      student_name: "Mr. MC",
      email: "mrMc.vivekanand@school.edu",
      enrollmentdate: new Date('2023-03-12'),
      grade: [{ subject: 'English', score: 65 }]
    },
    {
      id: 23,
      student_name: "SAO",
      email: "sao.rus@school.edu",
      enrollmentdate: new Date('2023-04-01'),
      grade: [
        { subject: 'Math', score: 50 },
        { subject: 'English', score: 60 }
      ]
    }
  ];

  ngOnInit() {
    if (this.studentService.studentInfo.length === 0) {
      this.studentService.studentInfo = [...this.studentLists];
    }
  }

  get studentList() {
    return this.studentService.getFilteredStudent(this.searchTerm);
  }

  filterStudent() {
    return this.studentService.getFilteredStudent(this.searchTerm);
  }
}
