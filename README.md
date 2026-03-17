# 📚 Angular Student Grade Tracker

> **Angular Practical - 1** | Difficulty: Intermediate | ⏱ Estimated Time: 3–5 hours

A student grade tracking system built with Angular, where teachers can manage student information, add grades for different subjects, calculate averages, and view performance statistics with visual indicators.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Features](#-features)
- [Component Architecture](#-component-architecture)
- [Services](#-services)
- [Data Binding](#-data-binding)
- [Directives](#-directives)
- [Custom Directive](#-custom-directive)
- [Pipes](#-pipes)
- [Component Communication](#-component-communication)
- [Lifecycle Hooks](#-lifecycle-hooks)
- [Bonus Challenges](#-bonus-challenges)
- [Evaluation Criteria](#-evaluation-criteria)
- [General Guidelines](#-general-guidelines)
- [Submission Instructions](#-submission-instructions)

---

## 🗂 Project Overview

Build a full-featured student grade tracker where:

- Teachers can **add and delete students**
- Grades can be **assigned per subject** with dates
- The system **calculates averages** and assigns **letter grades**
- A **statistics dashboard** shows class-level performance
- Grades are **color-coded** for quick visual feedback
- Students can be **filtered by performance** level

---

## 🛠 Tech Stack

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| Angular (latest)| Frontend framework               |
| TypeScript      | Language (strict mode required)  |
| Angular CLI     | Project scaffolding & generation |
| FormsModule     | Two-way data binding (`ngModel`) |
| Component CSS   | Scoped, per-component styling    |

---

## 📁 Project Structure

```
src/
└── app/
    ├── components/
    │   ├── student-list/         # Displays all students
    │   ├── student-card/         # Individual student info card
    │   ├── add-student/          # Form to add a new student
    │   ├── grade-form/           # Form to add grades to a student
    │   └── stats/                # Class-wide statistics
    ├── directives/
    │   └── grade-color/          # Custom color directive for grades
    ├── pipes/
    │   ├── letter-grade.pipe.ts  # Numeric → Letter grade
    │   ├── gpa-calculator.pipe.ts# Calculates GPA from grades array
    │   └── filter-by-performance.pipe.ts  # Filters students by range
    ├── services/
    │   ├── student.service.ts    # Core student data management
    │   └── grade-calculator.service.ts  # Grade stats logic
    ├── models/
    │   └── student.model.ts      # Student & Grade interfaces/types
    └── app.component.ts          # Root component
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Angular CLI installed globally

```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Create a new Angular project
ng new student-grade-tracker
cd student-grade-tracker

# 2. Install dependencies
npm install

# 3. Generate components
ng generate component components/student-list
ng generate component components/student-card
ng generate component components/add-student
ng generate component components/grade-form
ng generate component components/stats

# 4. Generate services
ng generate service services/student
ng generate service services/grade-calculator

# 5. Generate directives and pipes
ng generate directive directives/grade-color
ng generate pipe pipes/letter-grade
ng generate pipe pipes/gpa-calculator
ng generate pipe pipes/filter-by-performance

# 6. Run the development server
ng serve
```

Open your browser at `http://localhost:4200`

---

## ✨ Features

- ✅ Add new students with name, email, and enrollment date
- ✅ Display all students with basic info and average grade
- ✅ Add grades per subject with subject name and date
- ✅ Calculate and display overall average for each student
- ✅ Convert numeric averages to letter grades (A, B, C, D, F)
- ✅ View all grades for a student (subject + score + date)
- ✅ Delete students from the system
- ✅ Class statistics: total students, class average, top/bottom performer
- ✅ Color-coded grade visual indicators
- ✅ Filter students by performance level (Excellent, Good, Average, Poor)

---

## 🧩 Component Architecture

### `AppComponent` (Root)
- Acts as the shell/layout component
- Hosts `StatsComponent`, `AddStudentComponent`, and `StudentListComponent`

### `StudentListComponent`
- Displays the full list of students using `*ngFor`
- Passes each student down to `StudentCardComponent` via `@Input()`

### `StudentCardComponent`
- Shows individual student details: name, email, enrollment date, average
- Emits delete event to parent via `@Output()` + `EventEmitter`
- Uses `*ngSwitch` for grade status icons

### `AddStudentComponent`
- Form with `[(ngModel)]` for name, email, enrollment date
- Validates inputs before submitting

### `GradeFormComponent`
- Accepts subject name and score
- Emits the new grade to parent via `@Output()`

### `StatsComponent`
- Displays class-level stats: total students, class average, highest/lowest performer
- Initialized via `ngOnInit`

---

## ⚙️ Services

### `StudentService` (`providedIn: 'root'`)

**Student Model:**
```typescript
interface Grade {
  subject: string;
  score: number;
  date: Date;
}

interface Student {
  id: number;
  name: string;
  email: string;
  enrollmentDate: Date;
  grades: Grade[];
}
```

**Methods:**

| Method                          | Description                              |
|---------------------------------|------------------------------------------|
| `getStudents()`                 | Returns the list of all students         |
| `addStudent(student)`           | Adds a new student to the list           |
| `deleteStudent(id)`             | Removes a student by ID                  |
| `addGrade(studentId, grade)`    | Appends a grade to a student's record    |
| `calculateAverage(studentId)`   | Returns the numeric average for a student|
| `getLetterGrade(average)`       | Returns A/B/C/D/F from a numeric score   |

### `GradeCalculatorService`

Handles class-level statistics and calculations:
- Class average
- Highest and lowest performing student
- Subject-wise averages (bonus)

---

## 🔗 Data Binding

| Binding Type        | Usage                                                           |
|---------------------|-----------------------------------------------------------------|
| `[(ngModel)]`       | All form inputs: student name, email, subject, grade score      |
| Property Binding    | Button `[disabled]` state, form validation flags               |
| Event Binding       | `(submit)`, `(click)` for forms and delete actions             |
| Class Binding       | `[class]` to apply `success` / `warning` / `danger` by grade  |
| Style Binding       | `[style.width]` for dynamic progress bars                      |
| Template Ref Vars   | `#formRef="ngForm"` for validation feedback display            |

---

## 📌 Directives

| Directive      | Purpose                                                             |
|----------------|---------------------------------------------------------------------|
| `*ngFor`       | Render student list and grade list; use `trackBy` for performance  |
| `*ngIf`        | Show/hide: empty state message, grade detail section, stats panel  |
| `*ngSwitch`    | Display icons per letter grade (A → ⭐, B → 👍, C → 😐, D → ⚠️, F → ❌) |
| `ngClass`      | Apply conditional CSS classes based on grade performance level     |
| `ngStyle`      | Dynamically set width of performance progress bars                 |

---

## 🎨 Custom Directive

### `GradeColorDirective`

Automatically colors grade text based on the numeric score.

```typescript
@Directive({ selector: '[appGradeColor]' })
export class GradeColorDirective implements OnChanges {
  @Input('appGradeColor') grade: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(): void {
    const color =
      this.grade >= 90 ? 'green'  :
      this.grade >= 80 ? 'blue'   :
      this.grade >= 70 ? '#b8860b':  // dark yellow
      this.grade >= 60 ? 'orange' : 'red';

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```

**Usage in template:**
```html
<span [appGradeColor]="student.average">{{ student.average }}</span>
```

---

## 🔧 Pipes

### Built-in Pipes

| Pipe       | Usage Example                                   |
|------------|-------------------------------------------------|
| `date`     | `{{ grade.date \| date:'mediumDate' }}`          |
| `number`   | `{{ student.average \| number:'1.2-2' }}`        |

### Custom Pipes

#### `LetterGradePipe`
Converts a numeric grade to a letter grade.
```
90–100 → A | 80–89 → B | 70–79 → C | 60–69 → D | below 60 → F
```
```html
{{ student.average | letterGrade }}
```

#### `GpaCalculatorPipe`
Calculates a GPA value (0.0–4.0) from a student's grades array.
```html
{{ student.grades | gpaCalculator | number:'1.2-2' }}
```

#### `FilterByPerformancePipe`
Filters a list of students by performance category.
```html
{{ students | filterByPerformance:'Excellent' }}
```

| Category    | Score Range |
|-------------|-------------|
| Excellent   | 90–100      |
| Good        | 80–89       |
| Average     | 70–79       |
| Poor        | Below 70    |

---

## 📡 Component Communication

| Pattern             | Used For                                              |
|---------------------|-------------------------------------------------------|
| `@Input()`          | Pass `Student` object from `StudentList` → `StudentCard` |
| `@Output()` + `EventEmitter` | Emit delete event from `StudentCard` → `StudentList` |
| `@Output()` + `EventEmitter` | Emit new grade from `GradeForm` → parent component   |
| Shared Service      | `StudentService` injected across components for shared state |

---

## 🔄 Lifecycle Hooks

| Hook               | Component          | Purpose                                       |
|--------------------|--------------------|-----------------------------------------------|
| `ngOnInit`         | `StatsComponent`   | Load and calculate initial class statistics   |
| `ngOnInit`         | `StudentListComponent` | Fetch student list from service           |
| `ngOnChanges`      | `StudentCardComponent` | Recalculate average when grades change    |
| `ngAfterViewInit`  | Optional           | DOM-based calculations or chart rendering     |

---

## 🌟 Bonus Challenges

- [ ] Edit existing student information
- [ ] Delete individual grades from a student's record
- [ ] Weighted grading system: Assignments 40% · Midterm 30% · Final 30%
- [ ] Subject-wise class averages in the stats panel
- [ ] Grade distribution bar chart (CSS + divs only, no external libraries)
- [ ] Student search by name or email
- [ ] Grade input validation (0–100 range) with inline visual feedback
- [ ] "Students at Risk" section — shows students with average below 70

---

## 📊 Evaluation Criteria

| Criteria                                           | Weight |
|----------------------------------------------------|--------|
| Component structure and proper hierarchy           | 20%    |
| Service implementation with proper business logic  | 15%    |
| All binding types implemented correctly            | 15%    |
| Effective use of all required directives           | 15%    |
| Custom directive and pipes working correctly       | 15%    |
| Parent-child communication and data flow           | 10%    |
| Code quality and Angular best practices            | 10%    |

---

## 📐 General Guidelines

### Technical Requirements
- Use Angular CLI to generate **all** components, services, directives, and pipes
- Follow Angular naming conventions and file structure
- Import `FormsModule` in `AppModule` (required for `ngModel`)
- Use **TypeScript strict mode** and proper typing throughout
- Write clean, readable, and well-commented code

### Styling
- Add basic CSS to make the application presentable and intuitive
- Use **component-specific CSS files** for scoped styling
- Optionally experiment with `ViewEncapsulation`
- Prioritize a user-friendly, accessible UI

### Testing Your Application
- Verify all features work with varied data scenarios
- Test **empty states**, multiple items, and edge cases
- Confirm all directives and pipes function correctly
- Validate component communication (Input/Output) works end-to-end

---

## 📦 Submission Instructions

1. Create a new Angular project:
   ```bash
   ng new student-grade-tracker
   ```
2. Implement all required features, components, services, directives, and pipes
3. Test thoroughly to ensure everything works as expected
4. **Zip your project folder**, excluding `node_modules`:
   ```bash
   zip -r student-grade-tracker.zip student-grade-tracker/ --exclude "*/node_modules/*"
   ```
5. Submit the `.zip` file as instructed

---

> 💡 **Tip:** Start by setting up the data model and `StudentService`, then build components one at a time from the inside out — `StudentCard` first, then `StudentList`, then forms and stats last.