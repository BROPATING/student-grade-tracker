import { Component, inject } from '@angular/core';
import { StudentService } from '../../Services/student-service';
import Swal from 'sweetalert2';
/**
 * @class AddStudent
 * @description 
 * Component responsible for data entry and modification within the student management system.
 * It facilitates the registration of new students and the addition of grades to existing 
 * records, featuring duplicate ID validation and integrated SweetAlert2 notifications 
 * for real-time user feedback.
 * * @property {StudentService} studentService - Injected service used to manipulate global student data.
 * * @method studentList - Getter that retrieves the current master list of students from the service.
 * @method addStudent - Validates and adds a new student record; prevents duplicate IDs and provides success feedback.
 * @method updateStudentGrade - Appends a new subject and score to an existing student's record based on their ID.
 */
@Component({
  selector: 'app-add-student',
  imports: [],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
})
export class AddStudent {
  private studentService = inject(StudentService);
  id: number = 7;

  get studentList() {
    return this.studentService.studentInfo;
  }

  addStudent(id: string, name: string, email: string, date: string, subject: string, score: string) {
    if (!this.isFormValid(id, name, email, date, score)) {
      return; // Stop execution if form is invalid
    }
    const numericId = Number(id);
    const existing = this.studentService.studentInfo.find(s => s.id === numericId);

    // Check for duplicate
    if (existing) {
      Swal.fire('Duplicate ID', 'A student with this ID already exists!', 'warning');
      return;
    }
    const newStudent = {
      id: Number(id),
      student_name: name,
      email: email,
      enrollmentdate: new Date(date),
      grade: [
        { subject: subject, score: Number(score) }
      ]

    };

    // Push to the service array
    this.studentService.studentInfo.push(newStudent);

    Swal.fire({
      title: 'Success!',
      text: `${name} has been added to the system.`,
      icon: 'success',
      timer: 2000,
      customClass: {
        title: 'my-custom-alert-title',
        htmlContainer: 'my-custom-alert-content'
      },
      showConfirmButton: false
    });

  }

  // updateStudentGrade(id: string, sub: string, score: string) {
  //   const numericId = Number(id);
  //   const numericScore = Number(score)
  //   const isSuccess = this.studentService.addGradeToStudent(numericId, sub, numericScore);
  //   return this.studentService.addGradeToStudent(numericId, sub, numericScore);
  // }

  updateStudentGrade(id: string, sub: string, score: string) {
    const numericId = Number(id);
    const numericScore = Number(score);

    const isSuccess = this.studentService.addGradeToStudent(numericId, sub, numericScore);

    if (isSuccess) {
      Swal.fire({
        title: 'Success!',
        text: `ID: ${id} has been updated to the system.`,
        icon: 'success',
        customClass: {
          title: 'my-custom-alert-title',
          htmlContainer: 'my-custom-alert-content'
        },
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: 'Not Found',
        text: `No student found with ID: ${id}`,
        icon: 'error'
      });
    }
  }

  // Form Validation

  private isFormValid(id: string, name: string, email: string, date: string, score: string): boolean {
    // 1. Check for empty values
    if (!id || !name.trim() || !email.trim() || !date || !score) {
      Swal.fire('Missing Data', 'Please fill in all fields before submitting.', 'warning');
      return false;
    }

    // 2. Validate Email format using Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address.', 'error');
      return false;
    }

    // 3. Validate Score range (0 - 100)
    const numScore = Number(score);
    if (numScore < 0 || numScore > 100) {
      Swal.fire('Invalid Score', 'Score must be between 0 and 100.', 'error');
      return false;
    }

    return true;
  }
}

