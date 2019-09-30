import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newRestaurant: any ={
    name: '',
    type: '',
    description: '',

  }
  
  err: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService

  ) { }

  ngOnInit() {
    this.newRestaurant = { name: "", type: "", description: "" }
 
  }

  makeNewRestaurants() {
    console.log("hit comp.ts route")
    const obs = this._httpService.makeNewRestaurants(this.newRestaurant);
    obs.subscribe(data => {
      console.log(data);
      if(data['msg'] == "ERROR!"){
        this.err = data['info']
        this.ngOnInit()
      }
      else{
      this._router.navigate(['/home']);
      }
      });
  }

  goHome() {
    this._router.navigate(['/home']);
  }

}
