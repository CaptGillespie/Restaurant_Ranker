import { Component, OnInit, Input } from '@angular/core';
import {HttpService}from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
@Input() restaurantToShow: any;
selectedRestaurant: any;
id: any;
rid:any;
restaurants: any;
allRestaurants: any;
updatedvote: any;

constructor(
  private _HttpService: HttpService,
  private _route: ActivatedRoute,
  private _router: Router) { } 

  ngOnInit() {
    this.getRestaurantsFromService();
    this.selectedRestaurant ={};
    this._route.params.subscribe((params:Params)=>{
      this.rid = params;
    this.getARestaurant(params['id']);
    this.updatedvote= {votes:0};
    })
  }
  getRestaurantsFromService() {
    let observable = this._HttpService.getAllRestaurants();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.restaurants = data;
    });
  }
  getARestaurant(id){
    const obs= this._HttpService.getOneRestaurant(id);
    obs.subscribe(data=>{
      this.selectedRestaurant = data['info'];
    })
  }



// VOTES*******************************************

  voteRestaurant(theRest){
    theRest.votes ++;
    const obs= this._HttpService.updateRestaurant(this.selectedRestaurant._id, theRest);
    obs.subscribe(data=>{
      this.selectedRestaurant = data['info'];
      this._router.navigate(['/home']);
    })
  }
  voteAgainstRestaurant(theRest){
    theRest.votes --;
    const obs= this._HttpService.updateRestaurant(this.selectedRestaurant._id, theRest);
    obs.subscribe(data=>{
      this.selectedRestaurant = data['info'];
      this._router.navigate(['/home']);
    })
  }



  // REVIEWS****************************************

  updateAReview(updateReview) {
    console.log("hit comp.ts route")
    const obs = this._HttpService.updateRestaurant(updateReview._id, updateReview);
    obs.subscribe(data => {
      console.log(data);
      this._router.navigate(['/info']);
      });
    }

  deleteOneReview(id) {
    console.log("hit ts delete route, id is ",id)
    let observable = this._HttpService.deletereview(this.selectedRestaurant._id, id);
    observable.subscribe(data => {
      console.log(data);
      this._router.navigate(['/info'+ '/' + this.selectedRestaurant._id]);

      
    })
  }


}
