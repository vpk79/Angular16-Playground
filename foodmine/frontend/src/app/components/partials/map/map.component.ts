import { LocationService } from './../../../services/location.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, Map, Marker, icon, latLng, map, marker, tileLayer } from 'leaflet';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @Input()
  order!:Order;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42]
  })
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];


  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map 
  currentMarker!: Marker;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

    this.initializeMap();
  }

  initializeMap() {

    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1)

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latLng) => {
        this.map.setView(latLng, this.MARKER_ZOOM_LEVEL)
       this.setMarker(latLng)

      }
    })
  }

  setMarker(latLng: LatLngExpression) {
    this.addressLatLng = latLng as LatLng;
    if (this.currentMarker){
      this.currentMarker.setLatLng(latLng)
      return;
    }

    this.currentMarker = marker(latLng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', ()=> {
      this.addressLatLng = this.currentMarker.getLatLng();

    })
   
  }

  set addressLatLng(latlng: LatLng){
    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    this.order.addressLatLng = latlng;

  }

}
