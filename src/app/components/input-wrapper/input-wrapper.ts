import {AfterViewInit, Component, ContentChild, ElementRef, input, Input, NgZone, Renderer2} from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-input-wrapper',
  imports: [
    TranslocoPipe,
    NgOptimizedImage
  ],
  templateUrl: './input-wrapper.html',
  styleUrl: './input-wrapper.scss'
})
export class InputWrapper implements AfterViewInit {
  label = input.required<string>()
  errorMessage = input<string>()
  resizable = input<boolean>(true)

  type: string = "text";
  showPassword = false;

  @ContentChild('input', {static: false}) inputElement!: ElementRef;
  @ContentChild('textarea', {static: false}) textareaElement!: ElementRef;

  isFocused = false;
  hasValue = false;

  get activeElement(): ElementRef | null {
    return this.inputElement || this.textareaElement || null;
  }

  get isTextarea(): boolean {
    return !!this.textareaElement;
  }

  constructor(private renderer: Renderer2, private zone: NgZone) {
  }

  handleShowPassword(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showPassword = !this.showPassword;
    if (this.inputElement) {
      if (this.showPassword) {
        this.inputElement.nativeElement.type = "text";
      } else {
        this.inputElement.nativeElement.type = "password";
      }
    }
  }

  ngAfterViewInit(): void {
    const activeEl = this.activeElement;

    if (activeEl) {
      const nativeElement = activeEl.nativeElement;

      // Set type only for input elements
      if (!this.isTextarea) {
        this.type = nativeElement.type;
      } else {
        this.type = "textarea";
      }

      // Focus event listener
      this.renderer.listen(nativeElement, 'focus', () => {
        this.zone.run(() => {
          this.isFocused = true;
        });
      });

      // Blur event listener
      this.renderer.listen(nativeElement, 'blur', () => {
        this.zone.run(() => {
          this.isFocused = false;
          this.hasValue = !!nativeElement.value;
          nativeElement.style.border = "";
        });
      });

      // Keyboard event listeners
      this.renderer.listen(nativeElement, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          nativeElement.style.border = "3px solid var(--Focus)";
        }
      });

      this.renderer.listen(nativeElement, 'mousedown', () => {
        nativeElement.style.border = "3px solid var(--Main)";
      });

      // Apply resize styles for textarea
      if (this.isTextarea) {
        const resizeValue = this.resizable() ? 'vertical' : 'none';
        this.renderer.setStyle(nativeElement, 'resize', resizeValue);
      }
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.hasValue = !!nativeElement.value;
          });
        });
      });
    }
  }
}
