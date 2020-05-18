import { ValidateService } from "./validate.service";

describe('ValidateService', () => {
  let validateService: ValidateService;
  let testUser = { user:'Testuser',password:'password'};
  let authenticatedUser = { user:'mandip',password:'Nagarr0'};

  beforeEach(() => {
    validateService = new ValidateService();
  });

  it('should be created', () => {
    expect(validateService).toBeTruthy();
  });
   // *** authenticateUser() testcases ***//
  describe('authenticateUser', () => {
    it('should aunthenticate user i.e return true if user cerentails are valid',()=>{
      const isUserValid = validateService.authentcateUser(authenticatedUser.user,authenticatedUser.password);
      expect(isUserValid).toEqual(true);
    });
    it('should return false if user cerentails are valid',()=>{
      const isUserValid = validateService.authentcateUser(testUser.user,testUser.password);
      expect(isUserValid).toEqual(false);
    });

  });
});