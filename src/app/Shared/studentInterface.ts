/**
 * @interface Grades
 * @description 
 * Represents an individual academic record for a specific subject. 
 * Includes the raw score and optional metadata like the calculated grade or date of assessment.
 * * @property {string} subject - The name of the academic course (e.g., "Math", "Science").
 * @property {number} score - The numeric marks obtained (typically 0-100).
 * @property {string} [grade] - Optional letter grade mapping (A, B, C, etc.).
 * @property {Date} [date] - Optional timestamp for when the grade was recorded.
 */
export interface Grades {
    subject: string;
    score: number;
    grade?: string; 
    date?: Date;    
}

/**
 * @interface StudentInfo
 * @description 
 * The primary data model for a student profile. It links personal identification 
 * details with a history of academic performance records.
 * * @property {number} id - Unique identifier for the student.
 * @property {string} student_name - Full name of the student.
 * @property {string} email - Contact email address.
 * @property {Date} enrollmentdate - The date the student joined the institution.
 * @property {Grades[]} grade - A collection of subject-specific scores.
 */
export interface StudentInfo {
    id: number;
    student_name: string;
    email: string;
    enrollmentdate: Date;
    grade: Grades[];
}

/**
 * @interface sutdentStats
 * @description 
 * A specialized data structure used for the Analytics Dashboard. It aggregates 
 * raw student data into meaningful performance metrics and class-wide distributions.
 * * @property {number} totalStudents - Count of students currently in the system.
 * @property {number} classAverage - The mean score across all students and subjects.
 * @property {object} highestPerformer - Details of the student with the best average.
 * @property {object} lowestPerformer - Details of the student with the lowest average.
 * @property {object} gradeDistribution - Frequency count of letter grades across the class.
 * @property {number} studentsAtRiskCount - Number of students falling below the 70% passing threshold.
 */
export default interface sutdentStats {
    totalStudents: number;
    classAverage: number;
    highestPerformer: { name: string; average: number };
    lowestPerformer: { name: string; average: number };
    gradeDistribution: {
        countA: number;
        countB: number;
        countC: number;
        countD: number;
        countF: number;
    };
    studentsAtRiskCount: number;
}