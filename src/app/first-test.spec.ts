/*
* Example Format

* user service getUser method should return the correct given user

describe('User service', () => {
  describe('getUser() method', ()=>{
    it('should return the correct given user', () =>{

    })
  })
 })

*/

describe('First Test', () => {
  let testVariable: any;

  beforeEach(() => {
    testVariable = {}; // empty object
  });

  it('should return if a is true', () => {
    // arrange the data
    testVariable.a = false;

    // check act
    testVariable.a = true;

    // assert
    expect(testVariable.a).toBe(true); // pass
    // expect(testVariable.a).toBe(false); // fail
  });
});
