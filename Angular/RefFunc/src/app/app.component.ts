import { Component, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RefFunc';

  changeStyle(el: HTMLElement) {
    console.log(el.innerHTML);
    el.style.backgroundColor = 'red';
  }
}


@Directive({
  selector: '[func]',
})
export class FuncDirective implements OnInit {
  @Input() func!: (val: HTMLElement) => unknown;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const view = this.container.createEmbeddedView(this.template, {
      $implicit: this.container.element.nativeElement,
    });
    this.func(view.rootNodes[0]);
  }
}