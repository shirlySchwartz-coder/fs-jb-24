import { Directive, ElementRef, OnInit,  } from '@angular/core';

@Directive({
  selector: '[appCenter]',
  standalone: true
})
export class CenterDirective implements OnInit {

  constructor(private el: ElementRef) {


  }
  ngOnInit(): void {
    this.el.nativeElement.style.listStyle = 'none';
    this.el.nativeElement.style.fontStyle= 'italic';
    this.el.nativeElement.style.background= 'green';
  }

}
