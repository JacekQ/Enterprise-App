import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { BrowserCookiesService } from '@ngx-utils/cookies/browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, filter, map, mergeMap, switchMap } from 'rxjs/operators';

import * as LayoutActions from './core/actions/layout.actions';
import * as fromRoot from './reducers';
import { OBSERVER_BREAKPOINTS } from './core/constants';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'applikacja';
  private unsubscribe: Subject<void> = new Subject();
  private observerBreakpoints = OBSERVER_BREAKPOINTS;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private titleService: Title,
    private cookies: BrowserCookiesService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('pl');
    let language = 'pl';
    const userLang = this.cookies.get('usr_lang');

    if (userLang) {
      language = userLang;
    } else {
      const browserLang: string = this.translateService.getBrowserLang();
      language = browserLang.match(/en|pl/) ? browserLang : 'pl';
    }

    this.store.dispatch(new LayoutActions.ChangeLanguage({ language }));

    this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        switchMap(event => {
          const translationKey = event['title'] || 'menu.empty';
          this.store.dispatch(
            new LayoutActions.SetRouteTitleKey({
              routeTitleKey: translationKey
            })
          );
          return this.translateService.get(translationKey);
        })
      )
      .subscribe(titleTranslation => {
        this.titleService.setTitle('titleTranslation');
        this.titleService.setTitle(titleTranslation);
      });

    this.translateService.onLangChange
      .pipe(
        takeUntil(this.unsubscribe),
        switchMap(() => this.store.select(fromRoot.getRouteTitleKey)),
        switchMap(routeTitleKey => this.translateService.get(routeTitleKey))
      )
      .subscribe(titleTranslation => {
        this.titleService.setTitle(titleTranslation);
      });

    this.observerBreakpoints.forEach(breakpoint => {
      this.breakpointObserver
        .observe(breakpoint.mediaQuery)
        .pipe(
          takeUntil(this.unsubscribe),
          filter((state: BreakpointState) => state.matches)
        )
        .subscribe(() => {
          this.store.dispatch(new LayoutActions.SetScreenSize(breakpoint.name));
        });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
