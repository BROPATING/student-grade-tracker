import { inject, Pipe, PipeTransform } from '@angular/core';
import { StudentInfo } from '../Shared/studentInterface';
import { StudentService } from '../Services/student-service';
/**
 * @class FilterByPerformancePipe
 * @description 
 * A custom data transformation pipe used to filter arrays of student objects based on 
 * their calculated academic performance. It utilizes the StudentService to determine 
 * the average score for each student and maps them to categories: Excellent (90+), 
 * Good (80-89), Average (70-79), or Poor (<70).
 * * @property {StudentService} stdService - Injected service used to calculate student averages for filtering.
 * * @method transform - Takes an array of students and a category string, returning a new 
 * filtered array matching the performance criteria.
 * * @example
 * // Returns only students with an average >= 90
 * {{ students | filterByPerformance: 'Excellent' }}
 */
@Pipe({
  name: 'filterByPerformance',
})
export class FilterByPerformancePipe implements PipeTransform {

  private stdService = inject(StudentService);

  transform(students: StudentInfo[], category: string): StudentInfo[] {

    return students.filter(std => {
      const avg = this.stdService.calculateAvg(std.grade);
      switch (category) {
        case ("Excellent"): return avg >= 90;
        case 'Good': return avg >= 80 && avg < 90;
        case 'Average': return avg >= 70 && avg < 80;
        case 'Poor': return avg < 70;
        default: return true;
      }
    });
  }

}
