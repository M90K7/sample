import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

/**
 * @author: Moslem Shahsavan `(m90k7@github.com)`
 * @license: MIT
 * @title RefDirective
 * @description Define element reference to angular html.
 * 
 * @sample 
 * #### html
  ```html
<p *ref="let ele as changeStyle with ['blue']">
  p.clientWidth: {{ ele.nativeElement.clientWidth }}
</p>
 ````
---
 #### typescript
 ```ts
 changeStyle(el: ElementRef, color: string, h1: HTMLElement) {
    console.log(el.nativeElement);
    el.nativeElement.style.backgroundColor = color;
    h1.style.border = `1px solid ${color}`;
  }
 ```
 */
@Directive({
  selector: '[ref]',
})
export class RefDirective implements OnInit {
  @Input() ref!: any;
  @Input() refFunc!: any;
  @Input() refBind!: any;
  @Input() refWith!: any[];

  private refEle!: ElementRef;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.refEle = { nativeElement: null };
    const view = this.container.createEmbeddedView(this.template, {
      '$implicit': this.refEle
    });
    this.refEle.nativeElement = view.rootNodes[0];
    const func = (this.ref || this.refFunc);

    if (!func || typeof func !== 'function') {
      return;
    }

    const params = (this.refWith && (Array.isArray(this.refWith) ? this.refWith : [this.refWith])) || [];

    if (this.refBind) {
      func.call(this.refBind, this.refEle, ...params);
    } else {
      func(this.refEle, ...params);
    }
  }

}