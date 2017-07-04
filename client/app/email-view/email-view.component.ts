import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css']
})
export class EmailViewComponent implements OnInit, OnDestroy {


  paramsSub: Subscription;
  emailSub: Subscription;
  email: any;
  account: string;
  timestamp: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
      this.timestamp = params['timestamp'];
      this.getEmailContent();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.emailSub.unsubscribe();
  }

  private getEmailContent() {
    this.emailSub = this.apiService.getEmailContent(this.account, this.timestamp).subscribe(email => this.email = email);
  }
}
