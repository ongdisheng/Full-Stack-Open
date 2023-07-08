describe('Blog app', function() {
  beforeEach(function() {
    // reset database state
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create a user 
    const user = {
      username: "jadon",
      name: "Jadon Sancho",
      password: "123456"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username').find('input')
    cy.contains('password').find('input')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // fill in user details
      cy.contains('username').find('input').type('jadon')
      cy.contains('password').find('input').type('123456')
      cy.contains('login').click()

      // verify correctness
      cy.contains('Jadon Sancho logged in')
    })

    it('fails with wrong credentials', function() {
      // fill in user details
      cy.contains('username').find('input').type('jadon')
      cy.contains('password').find('input').type('wrong')
      cy.contains('login').click()

      // invalid user 
      cy.get('.notification').contains('wrong username or password')
    })
  })
})