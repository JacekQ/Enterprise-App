import { Breakpoints } from '@angular/cdk/layout';

import { ScreenSizeEnum } from '../enums';

export const OBSERVER_BREAKPOINTS = [
  {
    name: ScreenSizeEnum.xs,
    mediaQuery: Breakpoints.XSmall
  },
  {
    name: ScreenSizeEnum.sm,
    mediaQuery: Breakpoints.Small
  },
  {
    name: ScreenSizeEnum.lg,
    mediaQuery: Breakpoints.Large
  },
  {
    name: ScreenSizeEnum.md,
    mediaQuery: Breakpoints.Medium
  },
  {
    name: ScreenSizeEnum.xl,
    mediaQuery: Breakpoints.XLarge
  }];
