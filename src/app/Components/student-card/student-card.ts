import { Component, inject, Input } from '@angular/core';
import { StudentInfo, Grades } from '../../Shared/studentInterface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { StudentService } from '../../Services/student-service';
/**
 * @class StudentCard
 * @description 
 * A reusable child component that represents an individual student's record within a table or list.
 * It displays student identity details and provides administrative actions, specifically 
 * managing the deletion process through a multi-step confirmation dialog using SweetAlert2.
 * * @property {StudentInfo} currentStudent - Input property receiving the specific student data object from the parent component.
 * @property {StudentService} stdService - Injected service used to perform deletion logic on the global student state.
 * * @method delBtn - Triggers a warning dialog to confirm student removal. Upon confirmation, 
 * it invokes the service-level deletion and displays a success notification.
 */
@Component({
  selector: 'app-student-card',
  imports: [CommonModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  @Input() currentStudent!: StudentInfo;
  private stdService = inject(StudentService);

  delBtn(index: number) {
    this.stdService.deleteStudent(index);
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${this.currentStudent.student_name}. This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
            title: 'my-custom-alert-title',
            htmlContainer: 'my-custom-alert-content'
          },
      confirmButtonColor: '#e74c3c', // Red for delete
      cancelButtonColor: '#2c3e50',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      // Check if user clicked the "Confirm" button
      if (result.isConfirmed) {
        this.stdService.deleteStudent(index);

        // Optional: Show a follow-up success toast
        Swal.fire({
          title: 'Deleted!',
          text: 'Student has been removed.',
          icon: 'success',
          timer: 1500,
          customClass: {
            title: 'my-custom-alert-title',
            htmlContainer: 'my-custom-alert-content'
          },
          showConfirmButton: false
        });
      }
    });
  }
}
