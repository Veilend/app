import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class HomePage {
  changeCity: boolean = true;
  geoAddress: string;
  cityName: string = "";
  notFound: boolean = false;
  
  unit: string = "metric";  
  city = {
    wind: {
      deg: "",
      speed: ""
    },
    main: {
      pressure: "",
      temp:"",
      humidity: ""
    },
    clouds: {
      all: ""
    },
    humidity: {},
    weather: [{
      icon: "",
      description: ""
    }]
  };

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private geolocation : Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private api:ApiService) {
  
  }

  ngOnInit() {
    this.getGeolocation();
  }
  
  around() {
    return Math.round(+this.city.main.temp);
  }

  directionWind() {
    let deg = +this.city.wind.deg;
    if (deg >= 22.5 && deg < 67.5) {
      return "Северо-восточный";
    }
    if (deg >= 67.6 && deg < 122.5) {
      return "Восточный";
    }
    if (deg >= 122.5 && deg < 157.5) {
      return "Юго-востчный";
    }
    if (deg >= 122.5 && deg < 157.5) {
      return "Юго-востчный";
    }
    if (deg >= 157.5 && deg < 202.5) {
      return "Южный";
    }
    if (deg >= 202.5 && deg < 247.5) {
      return "Юго-западный";
    }
    if (deg >= 247.5 && deg < 292.5) {
      return "Западный";
    }
    if (deg >= 292.5 && deg < 337) {
      return "Северно-западный";
    }
    return "Северный"
  }

  toogleUnit(unit) {
    this.unit = unit;
    this.getData();
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => { 
      let geoLatitude = resp.coords.latitude;
      let geoLongitude = resp.coords.longitude; 
      this.api.getWheaterByCord(geoLatitude,geoLongitude, this.unit).subscribe(res => {
        if(res) {
          this.city = res;          
          this.changeCity = false;
          this.cityName = res.name;
        } else {
          this.notFound = true;
          this.changeCity = true;
        }
      }, err => {
        console.log(err);
      });
    })
  }
  
  getiIcon () {
    return `http://openweathermap.org/img/wn/${this.city.weather[0].icon}@2x.png`
  }

  async getData() {    
    await this.api.getWheater(this.cityName, this.unit)
      .subscribe(res => {
        if(res) {
          this.city = res;          
          this.changeCity = false;
        } else {
          this.notFound = true;
          this.changeCity = true;
        }
      }, err => {
        console.log(err);
      });
  }
}
