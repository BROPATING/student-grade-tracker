import { Directive, ElementRef, Input, OnChanges, Renderer2, inject } from '@angular/core';
/**
 * @class GradeColor
 * @description 
 * An attribute directive that dynamically modifies the text color of an element 
 * based on a provided numeric score. It implements logic to map score ranges 
 * to specific semantic colors (e.g., green for excellence, red for failure) 
 * and applies these styles directly to the DOM using Renderer2 for safe manipulation.
 * * @property {number} score - Input property representing the student's grade value.
 * @property {ElementRef} ele - Reference to the host DOM element the directive is applied to.
 * @property {Renderer2} renderer - Service used to apply styles in a platform-independent way.
 * * @method ngOnChanges - Lifecycle hook that detects changes to the score input and 
 * recalculates/applies the corresponding text color and font weight.
 */
@Directive({
  selector: '[appGradeColor]',
})
export class GradeColor implements OnChanges{

  @Input('appGradeColor') score!: number;

  ele = inject(ElementRef);
  renderer = inject(Renderer2);

  ngOnChanges(): void {
    let color = 'red';
    if(this.score >= 90) color = 'green';
    else if(this.score >= 80) color = 'blue';
    else if(this.score >= 70) color = 'yellow';
    else if(this.score >= 60) color = 'orange';
    else if(this.score >= 50) color = 'red';

    this.renderer.setStyle(this.ele.nativeElement, 'color', color);
    this.renderer.setStyle(this.ele.nativeElement, 'font-size', 'bold');
  }

}
