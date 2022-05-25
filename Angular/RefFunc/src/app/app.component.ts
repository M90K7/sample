import { Component, Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  changeStyle(el: ElementRef) {
    (el.nativeElement as HTMLElement).style.backgroundColor = 'rgb(242, 119, 119)';
  }

  changeStyleColor(el: ElementRef, color: string) {
    (el.nativeElement as HTMLElement).style.backgroundColor = color;
  }

  color!: string;
  changeStyleColorUseContext(el: ElementRef, color: string) {
    (el.nativeElement as HTMLElement).style.backgroundColor = color;
    this.color = el.nativeElement.color;
  }

  changeStyleColorMixed(el: ElementRef, color: string, h2Ele: HTMLElement) {
    (el.nativeElement as HTMLElement).style.backgroundColor = color;
    h2Ele.style.border = `10px solid ${color}`;
  }

}