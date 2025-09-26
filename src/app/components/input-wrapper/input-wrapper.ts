// input-wrapper.component.ts
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  computed,
  signal,
  input
} from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'InputWrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, NgOptimizedImage],
  templateUrl: './input-wrapper.html',
  styleUrl: './input-wrapper.scss',
  host: {
    '[class.text-input-wrapper--focused]': 'isFocused()',
    '[class.text-input-wrapper--error]': 'errorMessage()',
    '[class.text-input-wrapper--filled]': 'hasValue()'
  }
})
export class InputWrapper implements AfterViewInit {
  label = input.required<string>();
  errorMessage = input<string>();
  resizable = input<boolean>(true);
  inputId = input<string>();

  @ContentChild('input', {static: false}) inputElement?: ElementRef<HTMLInputElement>;
  @ContentChild('textarea', {static: false}) textareaElement?: ElementRef<HTMLTextAreaElement>;

  readonly showPassword = signal(false);
  readonly isFocused = signal(false);
  readonly hasValue = signal(false);
  readonly inputType = signal<string>('text');

  private readonly activeElement = computed(() =>
    this.inputElement || this.textareaElement || null
  );

  private readonly isTextarea = computed(() => !!this.textareaElement);

  protected readonly isPasswordType = computed(() =>
    this.inputType() === 'password'
  );

  protected readonly shouldShowFloatingLabel = computed(() => {
    const type = this.inputType();
    return type === 'text' || type === 'password' || type === 'textarea';
  });

  protected readonly shouldShowCheckboxLabel = computed(() => {
    const type = this.inputType();
    return type === 'checkbox' || type === 'radio';
  });

  protected readonly shouldFloatLabel = computed(() =>
    this.isFocused() || this.hasValue()
  );

  protected readonly passwordIconSrc = computed(() =>
    this.showPassword() ? '/svg/Eye__shut.svg' : '/svg/Eye__open.svg'
  );

  protected readonly passwordToggleLabel = computed(() =>
    this.showPassword() ? 'HidePassword' : 'ShowPassword'
  );

  protected readonly errorId = computed(() =>
    this.inputId() ? `${this.inputId()}-error` : undefined
  );

  ngAfterViewInit(): void {
    this.setupInputElement();
  }

  private setupInputElement(): void {
    const activeEl = this.activeElement();
    if (!activeEl) return;

    const nativeElement = activeEl.nativeElement;

    this.setInputType(nativeElement);
    this.configureElement(nativeElement);
    this.setupEventListeners(nativeElement);
    this.checkInitialValue(nativeElement);
  }

  private setInputType(element: HTMLInputElement | HTMLTextAreaElement): void {
    if (element.tagName.toLowerCase() === 'textarea') {
      this.inputType.set('textarea');
    } else {
      this.inputType.set((element as HTMLInputElement).type || 'text');
    }
  }

  private configureElement(element: HTMLInputElement | HTMLTextAreaElement): void {
    if (this.inputId()) {
      element.id = this.inputId()!;
    }

    if (this.errorMessage()) {
      element.setAttribute('aria-describedby', this.errorId()!);
      element.setAttribute('aria-invalid', 'true');
    }

    if (this.isTextarea()) {
      const resizeValue = this.resizable() ? 'vertical' : 'none';
      (element as HTMLTextAreaElement).style.resize = resizeValue;
    }
  }

  private setupEventListeners(element: HTMLInputElement | HTMLTextAreaElement): void {
    element.addEventListener('focus', () => {
      this.isFocused.set(true);
    });

    element.addEventListener('blur', () => {
      this.isFocused.set(false);
      this.updateValueState(element);
    });

    element.addEventListener('input', () => {
      this.updateValueState(element);
    });
  }

  private updateValueState(element: HTMLInputElement | HTMLTextAreaElement): void {
    this.hasValue.set(!!element.value.trim());
  }

  private checkInitialValue(element: HTMLInputElement | HTMLTextAreaElement): void {
    setTimeout(() => {
      this.updateValueState(element);
    });
  }

  togglePassword(): void {
    this.showPassword.update(show => !show);

    const inputEl = this.inputElement;
    if (inputEl) {
      const newType = this.showPassword() ? 'text' : 'password';
      inputEl.nativeElement.type = newType;
    }
  }

  protected readonly isFocused$ = this.isFocused.asReadonly();
  protected readonly hasValue$ = this.hasValue.asReadonly();
}
