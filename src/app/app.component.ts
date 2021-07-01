import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  // template: `
  // <input type="text" #mapSearchField class="my-map-search-field">
  // <google-map width="100%" [center]="initialCoordinates" [options]="mapConfigurations">
  // </google-map>`,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapSearchField') searchField: ElementRef | any;
  @ViewChild(GoogleMap) map: GoogleMap | any;
  title = 'google-map-search';


  initialCoordinates = {
    lat: 46.533408,
    lng: 8.352592
  };
  mapConfigurations = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true
  };
   // tslint:disable-next-line: use-lifecycle-interface
   ngAfterViewInit(): void {
     const searchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
     this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement);
     searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();      
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        }
        else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
     });

  }
}
