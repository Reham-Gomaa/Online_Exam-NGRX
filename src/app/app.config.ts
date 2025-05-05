import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { Base_Url } from '../../projects/auth-api/src/public-api';
import { examReducer } from './store/exam/exam-reducer';
import { questionReducer } from './store/questions/question-reducer';
import { tokenReducer } from './store/token/token.reducer';
import { provideEffects } from '@ngrx/effects';
import { QuestionsEffects } from './store/questions/question-effetc';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([ reqHeaderInterceptor , resErrorInterceptor , loadingInterceptor ])),
    provideStore( {
      'token' : tokenReducer ,
      'exam' : examReducer ,
      'question' : questionReducer
    } ),
    provideEffects(QuestionsEffects),
    importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule),
    provideToastr(),
    { provide: Base_Url , useValue: `https://exam.elevateegy.com/api/v1` },
    provideAnimations(),
    provideCharts(withDefaultRegisterables())
]
};
