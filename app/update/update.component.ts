import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() restaurantToShow: any;
  id: any;
  therestaurant:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService

  ) { }

  ngOnInit() {
    this.therestaurant ={};
    this._route.params.subscribe((params:Params)=>{
    this.getARestaurant(params['id'])})
  }

  getARestaurant(id){
    const obs= this._httpService.getOneRestaurant(id);
    obs.subscribe(data=>{
      this.therestaurant = data['info'];
    })
  }

  updateARestaurant(updatedrestaurant) {
    console.log("hit comp.ts route")
    const obs = this._httpService.updateRestaurant(updatedrestaurant._id, updatedrestaurant);
    obs.subscribe(data => {
      console.log(data);
      this._router.navigate(['/home']);
      });
    }

    goHome() {
      this._router.navigate(['/home']);
        }

}
