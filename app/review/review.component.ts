import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() restaurantToShow: any;
  id: any;
  therestaurant:any;
  newreview: any;
  review:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
   

  ) { }

  ngOnInit() {
   
    this.therestaurant ={};
    this._route.params.subscribe((params:Params)=>{
    this.getARestaurant(params['id'])}) 

    this.newreview={
      yourname:"", 
      stars:"",
      comment:"",
    }
  }

  getARestaurant(id){
    const obs= this._httpService.getOneRestaurant(id);
    obs.subscribe(data=>{
      this.therestaurant = data['info'];
    })
  }

  addReviewfend(newreview){
    console.log("res id >>>>" + this.therestaurant._id)
    const obs= this._httpService.addReview(this.therestaurant._id, newreview);
    obs.subscribe(data=>{
      this.therestaurant = data['info'];
      this._router.navigate(['/info'+ '/' + this.therestaurant._id]);
    })
  }

  goHome() {
    this._router.navigate(['/home']);
      }

}
