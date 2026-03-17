import { Injectable, Input } from '@angular/core';
import sutdentStats, { Grades, StudentInfo } from '../Shared/studentInterface';
import { StudentStats } from '../Components/student-stats/student-stats';
/**
 * @class StudentService
 * @description 
 * The central data management hub for the application. This service handles 
 * the persistence of student records via LocalStorage and provides a suite of 
 * methods for CRUD operations, search filtering, and academic analytics.
 * * It acts as the "Single Source of Truth," allowing disparate components 
 * (List, Stats, and Grades) to share and synchronize state seamlessly.
 * * * @property {StudentInfo[]} studentInfo - The master array of student objects.
 * * @method setStudentData - Overwrites current local state with a new dataset.
 * @method studentInfoById - Searches for and returns a specific student's full record.
 * @method aaddStudent - Registers a new student profile into the system.
 * @method addGradeToStudent - Appends a new subject/score pair to a student's history.
 * @method deleteStudent - Removes a student from the record by ID.
 * @method calculateAvg - Computes the arithmetic mean of a grade array.
 * @method getFilteredStudent - Performs a case-insensitive search by name or ID.
 * @method getStats - Generates a comprehensive report including class averages and risk counts.
 * @method saveData - Persists the current state to the browser's LocalStorage.
 * @method loadData - Retrieves and parses the saved state from LocalStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // Start empty
  studentInfo: StudentInfo[] = [];

  // This method lets any component "hand over" data to the service
  setStudentData(data: StudentInfo[]) {
    this.studentInfo = data;
  }
  studentInfoGrade: Grades[] = [];

  // Get the student data using student ID
  studentInfoById(sId: number): StudentInfo | undefined {
    return this.studentInfo.find(std => std.id === sId);
  }

  // Add Student Information
  aaddStudent(id: number, name: string, email: string, enrollmentdate: Date) {
    this.studentInfo.push({
      id,
      student_name: name,
      email,
      enrollmentdate,
      grade: []
    });
  }

  // Update Student Grade
  addGradeToStudent(studentId: number, subject: string, score: number):boolean {
    const student = this.studentInfo.find(s => s.id === studentId);
    if (student) {
      student.grade.push({ subject, score });
      this.saveData(); // Save to localStorage if you're using it
      return true;
    }

    return false;
  }

  // Delete Student
  deleteStudent(id: number) {
    this.studentInfo = this.studentInfo.filter(s => s.id !== id);
    this.saveData();
  }

  // Calculate Average Score
  calculateAvg(grades: Grades[]): number {
    if (!grades || grades.length === 0) return 0;
    const totalScore = grades.reduce((acc, g) => acc + g.score, 0);
    const avg = totalScore / grades.length;
    return parseFloat(avg.toFixed(2));
  }

  // Get Student
  getFilteredStudent(search: string): StudentInfo[] {
    const find = search.toLowerCase().trim();
    if (!find) { return this.studentInfo };

    return this.studentInfo.filter(std => std.id.toString().includes(find) ||
      std.student_name.toLowerCase().includes(find));

  }

  // Stats
  
  calculateDistribution(averages: { name: string, avg: number }[]) {
    return {
      countA: averages.filter(a => a.avg >= 90).length,
      countB: averages.filter(a => a.avg >= 80 && a.avg < 90).length,
      countC: averages.filter(a => a.avg >= 70 && a.avg < 80).length,
      countD: averages.filter(a => a.avg >= 60 && a.avg < 70).length,
      countF: averages.filter(a => a.avg < 60).length
    };
  }

  getEmptyStats(): sutdentStats {
    return {
      totalStudents: 0, classAverage: 0,
      highestPerformer: { name: 'N/A', average: 0 },
      lowestPerformer: { name: 'N/A', average: 0 },
      gradeDistribution: { countA: 0, countB: 0, countC: 0, countD: 0, countF: 0 },
      studentsAtRiskCount: 0
    };
  }

  getStats(): sutdentStats {
    const students = this.studentInfo;
    if (students.length === 0) return this.getEmptyStats();

    const averages = students.map(s => ({
      name: s.student_name,
      avg: this.calculateAvg(s.grade)
    }));

    const sorted = [...averages].sort((a, b) => b.avg - a.avg);

    return {
      totalStudents: students.length,
      classAverage: averages.reduce((acc, curr) => acc + curr.avg, 0) / students.length,
      highestPerformer: { name: sorted[0].name, average: sorted[0].avg },
      lowestPerformer: { name: sorted[sorted.length - 1].name, average: sorted[sorted.length - 1].avg },
      gradeDistribution: this.calculateDistribution(averages),
      studentsAtRiskCount: averages.filter(a => a.avg < 70).length
    };
  }

  // Save the data
  saveData() {
    localStorage.setItem('students', JSON.stringify(this.studentInfo));
  }

  // Load the data
  loadData() {
    const saved = localStorage.getItem('students');
    if (saved) {
      this.studentInfo = JSON.parse(saved);
    }
  }

}
