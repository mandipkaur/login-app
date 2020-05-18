import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { Router } from '@angular/router';


import { LoginComponent } from './login.component';
import { ValidateService } from '../shared/validate.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let debugElement: DebugElement;
  let validateService: ValidateService;
  let fixture: ComponentFixture<LoginComponent>;
  const testUser = { user: 'Testuser', password: 'password'};
  const authenticatedUser = { user: 'mandip', password: 'Nagarr0'};
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  class MockValidateService {
    authentcateUser = (name, password) => {
    }
  }

  const error = 'Invalid Credentails.Please enter valid username or password.';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter},
        { provide: ValidateService, useClass: MockValidateService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    validateService = debugElement.injector.get(ValidateService);
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
        user: '',
        password: ''
      });
      expect(component.loginForm.status).toBe('INVALID');
    });
  });
  // ****  onLogin method testcases ***//
  describe('onLogin', () => {
    it('should call authenticateUser() with username and password ', () => {
      fixture.detectChanges();
      spyOn(validateService, 'authentcateUser');
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect(validateService.authentcateUser).toHaveBeenCalledWith(testUser.user, testUser.password);
    });
    it('should navigate to dashboard if user is authenticated i.e valid', () => {
      fixture.detectChanges();
      spyOn(validateService, 'authentcateUser').and.returnValue(true);
      component.loginForm.setValue({
        user: authenticatedUser.user,
        password: authenticatedUser.password
      });
      component.onLogin();
      expect (mockRouter.navigate).toHaveBeenCalledWith (['/dashboard']);
    });
    it('should not navigate to dashboard if user is not  authenticated i.e invalid', () => {
      spyOn(validateService, 'authentcateUser').and.returnValue(false);
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect (mockRouter.navigate).not.toHaveBeenCalledWith('/dashboard');
    });
    it('should display error message "Invalid Credentails" if  cerdentails are not of authenticed user', () => {
      expect(component.error).toEqual(null);
      spyOn(validateService, 'authentcateUser').and.returnValue(false);
      component.loginForm.setValue({
        user: testUser.user,
        password: testUser.password
      });
      component.onLogin();
      expect(component.error).toEqual(error);
    });
    it('should reset error message to null if user cerdentails is valid', () => {
      expect(component.error).toEqual(null);
      spyOn(validateService, 'authentcateUser').and.returnValue(true);
      component.loginForm.setValue({
        user: authenticatedUser.user,
        password: authenticatedUser.password
      });
      component.onLogin();
      expect(component.error).toEqual(null);
    });
  });
});
