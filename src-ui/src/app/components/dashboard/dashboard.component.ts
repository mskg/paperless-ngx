import { Component, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { PaperlessSavedView } from 'src/app/data/paperless-saved-view'
import { SavedViewService } from 'src/app/services/rest/saved-view.service'
import { SettingsService } from 'src/app/services/settings.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private savedViewService: SavedViewService,
    public settingsService: SettingsService
  ) {}

  get subtitle() {
    if (this.settingsService.displayName) {
      return $localize`Hello ${this.settingsService.displayName}, welcome to Paperless-ngx!`
    } else {
      return $localize`Welcome to Paperless-ngx!`
    }
  }

  savedViews: PaperlessSavedView[] = []

  ngOnInit(): void {
    this.savedViewService.listAll().subscribe((results) => {
      this.savedViews = results.results.filter(
        (savedView) => savedView.show_on_dashboard
      )
    })
  }
}
