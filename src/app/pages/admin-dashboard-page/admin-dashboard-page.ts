import {isPlatformBrowser} from '@angular/common';
import {Component, computed, inject, PLATFORM_ID, signal, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {concatMap, finalize, from, map, of, switchMap, toArray} from 'rxjs';
import {ArtModel} from '@interfaces/art.model';
import {ArtPictureModel} from '@interfaces/art-picture.model';
import {ArtTranslationModel} from '@interfaces/art-translation.model';
import {ArtService, CreateArtPayload, UpdateArtPayload} from '@services/art/art';
import {ToastService} from '@services/toast-service/toast-service';
import {InputWrapper} from '@components/input-wrapper/input-wrapper';
import {ArtTranslationService, CreateArtTranslationPayload} from '@services/art-translation/art-translation';
import {Markular} from 'markular';
import {environment} from '@environments/environment';
import {NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [
    ReactiveFormsModule,
    InputWrapper,
    Markular,
    TranslocoPipe,
    NgbModalModule
  ],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss'
})
export class AdminDashboardPage {
  private readonly artService = inject(ArtService);
  private readonly artTranslationService = inject(ArtTranslationService);
  private readonly toastService = inject(ToastService);
  private readonly transloco = inject(TranslocoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly modalService = inject(NgbModal);

  @ViewChild('artFormModal') private artFormModal?: TemplateRef<unknown>;

  readonly arts = signal<ArtModel[]>([]);
  readonly totalCount = signal(0);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly offset = signal(0);
  readonly editingArtId = signal<number | null>(null);
  readonly editingArt = signal<ArtModel | null>(null);
  readonly searchQuery = signal('');
  readonly filterFeatured = signal(false);
  readonly filterAvailable = signal(false);
  readonly isUploadingImage = signal(false);
  readonly isSavingPictureOrder = signal(false);
  readonly uploadQueue = signal<QueuedImage[]>([]);
  readonly initialPictureOrder = signal<number[]>([]);

  readonly form = new FormGroup({
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    currency_id: new FormControl<number | null>(null, [Validators.required]),
    creation_year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1000),
      Validators.max(9999)
    ]),
    language_code: new FormControl<string>('en'),
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    text: new FormControl<string>(''),
    width: new FormControl<number | null>(null),
    height: new FormControl<number | null>(null),
    depth: new FormControl<number | null>(null),
    available: new FormControl<boolean>(true),
    featured: new FormControl<boolean>(false)
  });

  readonly loadedCount = computed(() => this.arts().length);
  readonly featuredCount = computed(() =>
    this.arts().filter((art) => art.featured).length
  );
  readonly availableCount = computed(() =>
    this.arts().filter((art) => art.available).length
  );
  readonly hasMore = computed(() => this.loadedCount() < this.totalCount());
  readonly isEditing = computed(() => this.editingArtId() !== null);
  readonly hasQueuedImages = computed(() => this.uploadQueue().length > 0);
  readonly hasPictureOrderChanges = computed(() => {
    const current = this.editingArt()?.artPictures?.map((picture) => picture.id) ?? [];
    const initial = this.initialPictureOrder();
    if (current.length !== initial.length) {
      return false;
    }
    return current.some((id, index) => id !== initial[index]);
  });

  readonly filteredArts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const onlyFeatured = this.filterFeatured();
    const onlyAvailable = this.filterAvailable();

    return this.arts().filter((art) => {
      if (onlyFeatured && !art.featured) {
        return false;
      }
      if (onlyAvailable && !art.available) {
        return false;
      }
      if (!query) {
        return true;
      }

      const currency = art.currency?.currencyCode ?? `${art.currency_id}`;
      const translationText = (art.translations ?? [])
        .map((translation) => `${translation.title} ${translation.label}`)
        .join(' ');
      const haystack = `${art.id} ${art.creation_year} ${art.price} ${currency} ${translationText}`
        .toLowerCase();
      return haystack.includes(query);
    });
  });

  constructor() {
    this.loadArts(true);
  }

  loadArts(reset: boolean) {
    if (this.isLoading()) {
      return;
    }

    const pageOffset = reset ? 0 : this.offset();
    this.isLoading.set(true);
    this.artService
      .listAdmin(pageOffset)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (result) => {
          const arts = reset ? result.arts : [...this.arts(), ...result.arts];
          this.arts.set(arts);
          this.totalCount.set(result.count);
          this.offset.set(pageOffset + 1);
        },
        error: () => {
          this.toastService.error('adminDashboardLoadFailed');
        }
      });
  }

  refreshList() {
    this.offset.set(0);
    this.loadArts(true);
  }

  startEdit(art: ArtModel) {
    this.editingArtId.set(art.id);
    this.editingArt.set(art);
    this.clearUploadQueue();
    this.initialPictureOrder.set([]);
    this.form.reset({
      price: art.price ?? null,
      currency_id: art.currency_id ?? null,
      creation_year: art.creation_year ?? null,
      language_code: 'en',
      title: '',
      description: '',
      text: '',
      width: art.width ?? null,
      height: art.height ?? null,
      depth: art.depth ?? null,
      available: art.available ?? true,
      featured: art.featured ?? false
    });
    this.loadArtDetails(art.id);
    this.openArtModal();
  }

  resetForm() {
    this.editingArtId.set(null);
    this.editingArt.set(null);
    this.clearUploadQueue();
    this.initialPictureOrder.set([]);
    this.form.reset({
      price: null,
      currency_id: null,
      creation_year: null,
      language_code: 'en',
      title: '',
      description: '',
      text: '',
      width: null,
      height: null,
      depth: null,
      available: true,
      featured: false
    });
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const payload = this.buildPayload();
    if (!payload) {
      return;
    }

    this.isSaving.set(true);
    const isEditing = this.isEditing();
    const request = isEditing
      ? this.artService.updateArt(this.editingArtId()!, payload as UpdateArtPayload)
      : this.artService.createArt(payload as CreateArtPayload);

    request.pipe(
      switchMap((art) => {
        if (isEditing) {
          return of(art);
        }

        const translationPayload = this.buildTranslationPayload(art.id);
        if (!translationPayload) {
          return of(art);
        }

        return this.artTranslationService.createTranslation(translationPayload).pipe(map(() => art));
      }),
      switchMap((art) => this.savePicturesForArt(art.id).pipe(map(() => art))),
      finalize(() => this.isSaving.set(false))
    ).subscribe({
      next: () => {
        this.toastService.success('adminDashboardSaved');
        this.resetForm();
        this.modalService.dismissAll();
        this.refreshList();
      },
      error: () => {
        this.toastService.error('adminDashboardSaveFailed');
      }
    });
  }

  toggleFeatured() {
    this.filterFeatured.update((value) => !value);
  }

  toggleAvailableFilter() {
    this.filterAvailable.update((value) => !value);
  }

  toggleFeaturedFlag(art: ArtModel) {
    this.updateArtFlags(art.id, {featured: !art.featured});
  }

  toggleAvailableFlag(art: ArtModel) {
    this.updateArtFlags(art.id, {available: !art.available});
  }

  deleteArt(art: ArtModel) {
    if (!this.canConfirmDelete(art)) {
      return;
    }

    this.artService.deleteArt(art.id).subscribe({
      next: () => {
        this.toastService.success('adminDashboardDeleted');
        this.refreshList();
      },
      error: () => {
        this.toastService.error('adminDashboardDeleteFailed');
      }
    });
  }

  updateSearch(query: string) {
    this.searchQuery.set(query);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    const artId = this.editingArtId();
    if (files.length === 0 || !artId) {
      return;
    }

    const queuedImages = files.map((file) => ({
      id: this.createQueueId(),
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file)
    }));
    this.uploadQueue.update((current) => [...current, ...queuedImages]);

    input.value = '';
  }

  openArtModal() {
    if (!this.artFormModal) {
      return;
    }
    this.modalService.open(this.artFormModal, {size: 'xl', scrollable: true, centered: true});
  }

  openCreateModal() {
    this.resetForm();
    this.openArtModal();
  }

  removeQueuedImage(id: string) {
    const target = this.uploadQueue().find((item) => item.id === id);
    if (target) {
      URL.revokeObjectURL(target.previewUrl);
    }
    this.uploadQueue.update((current) => current.filter((item) => item.id !== id));
  }

  moveQueuedImageUp(index: number) {
    this.uploadQueue.update((current) => this.swapQueueItems(current, index, index - 1));
  }

  moveQueuedImageDown(index: number) {
    this.uploadQueue.update((current) => this.swapQueueItems(current, index, index + 1));
  }

  setQueuedPreview(index: number) {
    this.uploadQueue.update((current) => this.moveQueueItem(current, index, 0));
  }

  movePictureUp(index: number) {
    this.reorderArtPictures((pictures) => this.swapQueueItems(pictures, index, index - 1));
  }

  movePictureDown(index: number) {
    this.reorderArtPictures((pictures) => this.swapQueueItems(pictures, index, index + 1));
  }

  setPreviewPicture(index: number) {
    this.reorderArtPictures((pictures) => this.moveQueueItem(pictures, index, 0));
  }

  getArtPictureUrl(artPicture: ArtPictureModel): string {
    const picture = artPicture.picture;
    if (!picture) {
      return '';
    }
    return `${environment.pictureUrl}/${picture.name}${picture.type}`;
  }

  getArtTitle(art: ArtModel): string {
    const translation = this.getPrimaryTranslation(art);
    const title = translation?.title?.trim();
    return title || this.transloco.translate('adminDashboardUntitled');
  }

  getArtLabel(art: ArtModel): string | null {
    const translation = this.getPrimaryTranslation(art);
    const label = translation?.label?.trim();
    return label || null;
  }

  private updateArtFlags(id: number, payload: UpdateArtPayload) {
    this.artService.updateArt(id, payload).subscribe({
      next: () => {
        this.toastService.success('adminDashboardSaved');
        this.refreshList();
      },
      error: () => {
        this.toastService.error('adminDashboardSaveFailed');
      }
    });
  }

  private loadArtDetails(artId: number) {
    this.artService.getAdminByID(artId).subscribe({
      next: (art) => {
        this.editingArt.set(art);
        this.initialPictureOrder.set(art.artPictures?.map((picture) => picture.id) ?? []);
      },
      error: () => {
        this.toastService.error('adminDashboardLoadFailed');
      }
    });
  }

  private buildPayload(): CreateArtPayload | UpdateArtPayload | null {
    const price = this.form.controls.price.value;
    const currencyId = this.form.controls.currency_id.value;
    const creationYear = this.form.controls.creation_year.value;

    if (price === null || currencyId === null || creationYear === null) {
      return null;
    }

    const payload: CreateArtPayload = {
      price,
      currency_id: currencyId,
      creation_year: creationYear,
      available: this.form.controls.available.value ?? true,
      featured: this.form.controls.featured.value ?? false
    };

    const width = this.form.controls.width.value;
    const height = this.form.controls.height.value;
    const depth = this.form.controls.depth.value;

    if (width !== null) {
      payload.width = width;
    }
    if (height !== null) {
      payload.height = height;
    }
    if (depth !== null) {
      payload.depth = depth;
    }

    return payload;
  }

  private buildTranslationPayload(artId: number): CreateArtTranslationPayload | null {
    const languageCode = (this.form.controls.language_code.value ?? '').trim();
    const title = (this.form.controls.title.value ?? '').trim();
    const description = (this.form.controls.description.value ?? '').trim();
    const text = (this.form.controls.text.value ?? '').trim();

    if (!languageCode || !title || !description || !text) {
      return null;
    }

    return {
      artID: artId,
      languageCode,
      title,
      description,
      text
    };
  }

  private savePicturesForArt(artId: number) {
    const queue = this.uploadQueue();
    const existingOrder = this.editingArt()?.artPictures?.map((picture) => picture.id) ?? [];
    const shouldSaveOrder = this.hasPictureOrderChanges() || queue.length > 0;

    if (queue.length === 0) {
      if (!shouldSaveOrder) {
        return of(undefined);
      }
      this.isSavingPictureOrder.set(true);
      return this.artService.updateArtPictureOrder(artId, existingOrder).pipe(
        finalize(() => {
          this.isSavingPictureOrder.set(false);
          this.loadArtDetails(artId);
        }),
        map(() => undefined)
      );
    }

    const basePriority = existingOrder.length;
    this.isUploadingImage.set(true);
    return from(queue).pipe(
      concatMap((item, index) =>
        this.artService.uploadArtPicture(artId, item.file, {
          name: item.name,
          priority: basePriority + index + 1
        })
      ),
      toArray(),
      switchMap((uploaded) => {
        if (!shouldSaveOrder) {
          return of(undefined);
        }
        const updatedOrder = [...existingOrder, ...uploaded.map((picture) => picture.id)];
        this.isSavingPictureOrder.set(true);
        return this.artService.updateArtPictureOrder(artId, updatedOrder).pipe(
          finalize(() => this.isSavingPictureOrder.set(false)),
          map(() => undefined)
        );
      }),
      finalize(() => {
        this.isUploadingImage.set(false);
        this.clearUploadQueue();
        this.loadArtDetails(artId);
      }),
      map(() => undefined)
    );
  }

  private canConfirmDelete(art: ArtModel): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const message = this.transloco.translate('adminDashboardConfirmDelete', {
      id: art.id
    });
    return window.confirm(message);
  }

  private getPrimaryTranslation(art: ArtModel): ArtTranslationModel | undefined {
    const translations = art.translations ?? [];
    return translations.find((translation) => translation.language?.language_code === 'en')
      ?? translations[0];
  }

  private clearUploadQueue() {
    this.uploadQueue().forEach((item) => URL.revokeObjectURL(item.previewUrl));
    this.uploadQueue.set([]);
  }

  private reorderArtPictures(
    update: (pictures: ArtPictureModel[]) => ArtPictureModel[]
  ) {
    this.editingArt.update((current) => {
      if (!current?.artPictures) {
        return current;
      }
      return {
        ...current,
        artPictures: update([...current.artPictures])
      };
    });
  }

  private swapQueueItems<T>(items: T[], fromIndex: number, toIndex: number): T[] {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) {
      return items;
    }
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
  }

  private moveQueueItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex < 0 || fromIndex >= items.length || fromIndex === toIndex) {
      return items;
    }
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
  }

  private createQueueId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

type QueuedImage = {
  id: string;
  file: File;
  name: string;
  previewUrl: string;
};
