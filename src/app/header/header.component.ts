import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';

import { LocalizationService } from '../l10n/l10n.service';
import { FeatureToggleService } from '../feature-toggle/feature-toggle.service';
import { CvItemService } from '../cv-item/cv-item.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private l10n;
  private featureToggles;
  private generalData;
  private navLinks = [];

  private windowWidth: number = window.innerWidth;

  // initial values, the window object may still be undefined during this hook
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  // if screen size changes it'll update
  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private localizationService: LocalizationService,
    private featureToggleService: FeatureToggleService,
    private cvItemService: CvItemService,
  ) { }

  private getLocalization(): void {
    this.l10n = this.localizationService.getDefault();
  }

  private getFeatureToggles(): void {
    this.featureToggles = this.featureToggleService.getFeatureToggles();
  }

  private getItems(): void {
    this.generalData = this.cvItemService.getGeneralData();
  }

  private populateNavLinks(): void {
    this.navLinks.push({   location: '/overview',       label: this.l10n.header.menu_overiew,          icon: 'account_circle' });
    this.navLinks.push({   location: '/experience',     label: this.l10n.header.menu_experience,       icon: 'work' });
    this.navLinks.push({   location: '/education',      label: this.l10n.header.menu_education,        icon: 'school' });
    if (this.featureToggles.tab_publications === true) {
      this.navLinks.push({ location: '/publications',   label: this.l10n.header.menu_publications,     icon: 'record_voice_over' });
    }
    if (this.featureToggles.tab_projects === true) {
      this.navLinks.push({ location: '/projects',       label: this.l10n.header.menu_projects,         icon: 'assignment' });
    }
    if (this.featureToggles.tab_volunteering === true) {
      this.navLinks.push({ location: '/volunteering',   label: this.l10n.header.menu_volunteering,     icon: 'favorite' });
    }
    this.navLinks.push({   location: '/contact',        label: this.l10n.header.menu_contact,          icon: 'email' });
    // { location:'/about',         label: this.l10n.header.menu_about,             icon:'info' },
  }

  ngOnInit() {
    this.getLocalization();
    this.getFeatureToggles();
    this.getItems();
    this.populateNavLinks();
  }

}
