import { Pipe, PipeTransform } from '@angular/core';
/**
 * @class LetterGradePipe
 * @description 
 * A transformation pipe that converts numeric average scores into categorical letter grades.
 * It follows a standard grading hierarchy: A (90+), B (80+), C (70+), D (60+), E (50+), 
 * and F for scores below 50. This is used throughout the UI to provide a quick 
 * visual representation of student performance.
 * * @method transform
 * @param {number} val - The numeric average score to be converted.
 * @returns {string} A single character representing the assigned letter grade.
 * * @example
 * // If val is 92, returns "A"
 * {{ 92 | letterGrade }}
 */
@Pipe({
  name: 'letterGrade',
})
export class LetterGradePipe implements PipeTransform {

  transform(val: number): string {
    if(val >= 90) return "A";
    if(val >= 80) return "B";
    if(val >= 70) return "C";
    if(val >= 60) return "D";
    if(val >= 50) return "E";
    return "F";
  }

}
