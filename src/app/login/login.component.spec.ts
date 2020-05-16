import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testUser = { user:'Testuser',password:'password'};
  let authenticatedUser = { user:'mandip',password:'Naggar0'};
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

      it('should intiliase loginForm to form create form object', () => {
          component.ngOnInit();
          expect(component.loginForm).not.toBe(undefined);
      });
      it('should add required validator to form items, form invalid if user and password is missing', () => {
        component.ngOnInit();
        component.loginForm.setValue({
          user:"",
          password:""
        });
        expect(component.loginForm.status).toBe('INVALID');
      });
    });
    

  //*** authenticateUser() testcases ***//
  describe('authenticateUser', () => {
    it('should aunthenticate user i.e return true if user cerentails are valid',()=>{
      const isUserValid = component.authentcateUser(authenticatedUser.user,authenticatedUser.password);
      fixture.detectChanges();
      expect(isUserValid).toEqual(true);
    });
    it('should return false if user cerentails are valid',()=>{
      const isUserValid = component.authentcateUser(testUser.user,testUser.password);
      fixture.detectChanges();
      expect(isUserValid).toEqual(false);
    });

  });
 
  //****  onLogin method testcases ***//
  describe('onLogin', () => {
    it('should call authenticateUser() with username and password ',()=>{
      fixture.detectChanges();
      spyOn(component,'authentcateUser');
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect(component.authentcateUser).toHaveBeenCalledWith(testUser.user,testUser.password);
    });
    it('should navigate to dashboard if user is authenticated i.e valid',()=>{
      fixture.detectChanges();
      spyOn(component,'authentcateUser').and.returnValue(true);
      component.loginForm.setValue({
        user: authenticatedUser.user,
        password: authenticatedUser.password
      });
      component.onLogin();
      expect (mockRouter.navigate).toHaveBeenCalledWith (['/dashboard']);
    });
    it('should not navigate to dashboard if user is not  authenticated i.e invalid',()=>{
      spyOn(component,'authentcateUser').and.returnValue(false);
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect (mockRouter.navigate).not.toHaveBeenCalledWith('/dashboard');
    });
    it('should display error message "Invalid Credentails" if  cerdentails are not of authenticed user',()=>{
      expect(component.error).toEqual(null);
      spyOn(component,'authentcateUser').and.returnValue(false);
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect(component.error).toEqual('Invalid Credentails.Please enter valid username or password');
    });
    it('should reset error message to null if user cerdentails is valid',()=>{
      expect(component.error).toEqual(null);
      spyOn(component,'authentcateUser').and.returnValue(true);
      component.loginForm.setValue({
        user: authenticatedUser.user,
        password: authenticatedUser.password
      });
      component.onLogin();
      expect(component.error).toEqual(null);
    });
  });
});
