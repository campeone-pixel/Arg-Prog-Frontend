import {
  Directive,
  Injectable,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[scrollSpy]',
})
export class ScrollSpyDirective {
  @Input() public spiedTags:string[] = [];
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string ='home';
  
  constructor(private _el: ElementRef) {
    
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let currentSection: string = 'home'
    console.log(currentSection)
    const children = this._el.nativeElement.children;
    
    const scrollTop = event.target.scrollTop;
    const parentOffset = event.target.offsetTop;
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      console.log(children[i].tagName.substring(0,3))
      if (this.spiedTags.some((spiedTag) => spiedTag === element.tagName.substring(0,3))) {
        
        if (element.offsetTop - parentOffset <= scrollTop+320) {
          currentSection = element.id;
          
        }
      }
    }

    if (currentSection !== this.currentSection) {
      
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }
}
