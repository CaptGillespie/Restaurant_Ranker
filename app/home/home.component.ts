import { Component, OnInit, Input } from '@angular/core';
import {HttpService}from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allRestaurants: any;
restaurants: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) {
    this.getRestaurants();
  }
  
   ngOnInit() {
      this.getRestaurantsFromService();
    }

    getRestaurantsFromService() {
      let observable = this._httpService.getAllRestaurants();
      observable.subscribe(data => {
        console.log("Got our tasks!", data)
        this.restaurants = data;
      });
    }
    getRestaurants(){
      const obs = this._httpService.getAllRestaurants();
      obs.subscribe(data => {
        if(data['msg']=='success'){
          this.allRestaurants = data['info'];
        }
        })
      }
     
      deleteOneRestaurant(id) {
        console.log("successfully deleted restaurant")
        let observable = this._httpService.deleteOneRestaurant(id);
        observable.subscribe(data => {
        this.getRestaurantsFromService()
        })
      }


}
