import { Pipe, PipeTransform } from '@angular/core';
/**
 * @class GpaCalculatorPipe
 * @description 
 * A utility pipe designed to convert a percentage-based average score into a 
 * standard 10-point GPA (Grade Point Average) scale. It performs a linear 
 * transformation and formats the output to a fixed precision of two decimal places.
 * * @method transform
 * @param {number} avg - The student's average percentage score (0-100).
 * @returns {string} The calculated GPA formatted as a string (e.g., "8.50").
 * * @example
 * // If average is 85, returns "8.50"
 * {{ 85 | gpaCalculator }}
 */
@Pipe({
  name: 'gpaCalculator',
})
export class GpaCalculatorPipe implements PipeTransform {

  transform(avg: number): string {
    const gpa = (avg / 100) * 10;
    return gpa.toFixed(2);
  }
}
