import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, PLATFORM_ID} from '@angular/core';
import {of} from 'rxjs';
import {TranslocoService} from '@jsverse/transloco';

import {AdminDashboardPage} from './admin-dashboard-page';
import {ArtService} from '@services/art/art';
import {ArtTranslationService} from '@services/art-translation/art-translation';
import {CurrencyService} from '@services/currency/currency';
import {ToastService} from '@services/toast-service/toast-service';

describe('AdminDashboardPage', () => {
  let component: AdminDashboardPage;
  let fixture: ComponentFixture<AdminDashboardPage>;

  beforeEach(async () => {
    const artServiceStub = {
      listAdmin: () => of({arts: [], count: 0}),
      createArt: () => of({}),
      updateArt: () => of({}),
      deleteArt: () => of({})
    };
    const artTranslationServiceStub = {
      createTranslation: () => of({})
    };
    const currencyServiceStub = {
      list: () => of({currencies: [], count: 0})
    };
    const toastServiceStub = {
      success: () => {},
      error: () => {}
    };
    const translocoStub = {
      translate: (key: string) => key
    };

    await TestBed.configureTestingModule({
      imports: [AdminDashboardPage],
      providers: [
        {provide: ArtService, useValue: artServiceStub},
        {provide: ArtTranslationService, useValue: artTranslationServiceStub},
        {provide: CurrencyService, useValue: currencyServiceStub},
        {provide: ToastService, useValue: toastServiceStub},
        {provide: TranslocoService, useValue: translocoStub},
        {provide: PLATFORM_ID, useValue: 'browser'}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
