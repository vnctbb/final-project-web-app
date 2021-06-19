import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from '../app/auth/auth.guard'
import { AuthInterceptor } from '../app/auth/auth.interceptor';

// FR LOCALE
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

// ANGULAR MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';  
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';  
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatRadioModule} from '@angular/material/radio'; 

// CONTROLLER
import { UserComponent } from './controller/user/user.component';
import { SignUpComponent } from './controller/user/sign-up/sign-up.component';
import { UserProfileComponent } from './controller/user-profile/user-profile.component';
import { SignInComponent } from './controller/user/sign-in/sign-in.component';
import { CreatePostComponent } from './controller/post/create-post/create-post.component'
import { HeaderComponent } from './controller/header/header.component';
import { LoaderComponent } from './controller/loader/loader.component';
import { PostComponent } from './controller/post/post.component';
import { UserFriendComponent } from './controller/friend/user-friend/user-friend.component';
import { OtherProfileComponent } from './controller/other-profile/other-profile.component';
import { ManageFriendComponent } from './controller/friend/manage-friend/manage-friend.component';
import { UserPostComponent } from './controller/post/user-post/user-post.component';
import { UpdatePostComponent } from './controller/post/update-post/update-post.component';
import { UserInfoComponent } from './controller/user-profile/user-info/user-info.component';
import { UserTopicComponent } from './controller/topic/user-topic/user-topic.component';
import { CreateTopicComponent } from './controller/topic/create-topic/create-topic.component';
import { CreateTopicModalComponent } from './controller/topic/create-topic-modal/create-topic-modal.component';
import { UpdateTopicModalComponent } from './controller/topic/update-topic-modal/update-topic-modal.component';
import { ListTopicComponent } from './controller/topic/list-topic/list-topic.component';
import { TopicComponent } from './controller/topic/topic/topic.component';
import { UpdateTopicmessageModalComponent } from './controller/topic/update-topicmessage-modal/update-topicmessage-modal.component';
import { LoaderCardComponent } from './controller/loader-card/loader-card.component';
import { UserDeleteSheetComponent } from './controller/user-profile/user-delete-sheet/user-delete-sheet.component';
import { UserInfoUpdateModalComponent } from './controller/user-profile/user-info-update-modal/user-info-update-modal.component';
import { OtherPostComponent } from './controller/post/other-post/other-post.component';
import { OtherFriendComponent } from './controller/friend/other-friend/other-friend.component';
import { PostcomModalComponent } from './controller/postcom/postcom-modal/postcom-modal.component';
import { PostcomUpdateModalComponent } from './controller/postcom/postcom-update-modal/postcom-update-modal.component';
import { HomeComponent } from './controller/home/home.component';
import { LikeComponent } from './controller/like/like.component';

//SERVICE
import { UserService } from '../app/service/user.service'
import { PostService } from '../app/service/post.service';
import { TopicService } from '../app/service/topic.service';
import { SearchResultComponent } from './controller/search-result/search-result.component';
import { SearchComponent } from './controller/search/search.component';
import { ProfilePictureModalComponent } from './controller/user-profile/profile-picture-modal/profile-picture-modal.component';
import { SignInAdminComponent } from './controller/user/sign-in-admin/sign-in-admin.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { DashUserComponent } from './controller/dashboard/dash-user/dash-user.component';
import { DashPostComponent } from './controller/dashboard/dash-post/dash-post.component';
import { DashTopicComponent } from './controller/dashboard/dash-topic/dash-topic.component';
import { UserInfoModalComponent } from './controller/dashboard/dash-user/user-info-modal/user-info-modal.component';
import { PostComModalComponent } from './controller/dashboard/dash-post/post-com-modal/post-com-modal.component';
import { TopicMessageModalComponent } from './controller/dashboard/dash-topic/topic-message-modal/topic-message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HeaderComponent,
    LoaderComponent,
    PostComponent,
    CreatePostComponent,
    UserPostComponent,
    UpdatePostComponent,
    UserInfoComponent,
    UserTopicComponent,
    CreateTopicComponent,
    CreateTopicModalComponent,
    UpdateTopicModalComponent,
    ListTopicComponent,
    TopicComponent,
    UpdateTopicmessageModalComponent,
    LoaderCardComponent,
    UserDeleteSheetComponent,
    UserInfoUpdateModalComponent,
    UserFriendComponent,
    OtherProfileComponent,
    ManageFriendComponent,
    OtherPostComponent,
    OtherFriendComponent,
    PostcomModalComponent,
    PostcomUpdateModalComponent,
    LikeComponent,
    HomeComponent,
    SearchResultComponent,
    SearchComponent,
    ProfilePictureModalComponent,
    SignInAdminComponent,
    DashboardComponent,
    DashUserComponent,
    DashPostComponent,
    DashTopicComponent,
    UserInfoModalComponent,
    PostComModalComponent,
    TopicMessageModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },{ 
    provide: LOCALE_ID, useValue: "fr-FR"
    },
    AuthGuard,
    UserService,
    PostService,
    TopicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
