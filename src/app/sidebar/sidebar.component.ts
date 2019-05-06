import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUserRole: string;
  currentUser: string;

  public samplePagesCollapsed = true;
  constructor(private auth: AuthService) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;
  }

  ngOnInit() {
  }

  get isAdmin() {
    return this.currentUserRole === 'Admin';
  }

  get isSeller() {
    return this.currentUserRole === 'Seller';
  }

  get isUser() {
    return this.currentUserRole === 'User';
  }
}
