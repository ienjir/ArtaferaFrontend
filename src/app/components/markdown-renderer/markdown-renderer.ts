import {Component, computed, input, OnInit, SecurityContext, signal} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {marked} from "marked";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'AF-Markdown-Renderer',
  imports: [
    TranslocoPipe
  ],
  templateUrl: './markdown-renderer.html',
  styleUrl: './markdown-renderer.scss',
})
export class MarkdownRenderer {
  mdText = input.required<string>()
  isLoading = input<boolean>(false)
  unsanitizedHTML = computed(() => marked.parse(this.mdText()))
  sanitizedHTML = computed(() => this.sanitizeHTML(this.unsanitizedHTML()))

  constructor(private DomSanitizer: DomSanitizer) {
  }

  sanitizeHTML(html: string | Promise<string>) {
    return this.DomSanitizer.sanitize(SecurityContext.HTML, html)
  }
}
