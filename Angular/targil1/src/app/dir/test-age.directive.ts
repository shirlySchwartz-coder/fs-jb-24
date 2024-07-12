import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTestAge]',
  standalone: true
})
export class TestAgeDirective implements OnInit {

  constructor(private elementRef:ElementRef) { }
  ngOnInit(): void {
   this.elementRef.nativeElement.style.background = 'green'
  }

}
