# *Ref Directive

Define element reference to angular html.

```html
<p *ref="changeStyle">Sample 1 :)</p>
```

```ts
 changeStyle(el: ElementRef) {
    (el.nativeElement as HTMLElement).style.backgroundColor = 'rgb(242, 119, 119)';
  }
```

### `*ref` examples [stackblitz.com](https://stackblitz.com/edit/angular-ref-func)
