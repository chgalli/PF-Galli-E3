
import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appSizeTitle]'
})
export class TitleSizeDirective implements AfterViewInit {
  @Input() TitleSize: string = '15px';

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.adjustFontSize();
  }

  private adjustFontSize(): void {
    this.el.nativeElement.style.fontSize = this.TitleSize;
  }
}
