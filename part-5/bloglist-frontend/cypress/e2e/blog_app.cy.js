describe('Blog app', function() {
  beforeEach(function() {
    // reset database state
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create users 
    let user = {
      username: 'jadon',
      name: 'Jadon Sancho',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    user = {
      username: 'harry',
      name: 'Harry Kane',
      password: '123456'
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

  describe('When logged in', function() {
    beforeEach(function() {
      // login user 
      cy.login({ username: 'jadon', password: '123456' })
    })

    it('A blog can be created', function() {
      // fill in blog details 
      cy.contains('new blog').click()
      cy.contains('title').find('input').type('Harry Maguire Legacy')
      cy.contains('author').find('input').type('David Moyes')
      cy.contains('url').find('input').type('https://www.manutd.com/')
      cy.get('#create-button').click()
      
      // verify correctness
      cy.get('.notification').contains('a new blog Harry Maguire Legacy by David Moyes added')
      cy.get('html').contains('Harry Maguire Legacy David Moyes')
    })

    describe('A blog exists', function() {
      beforeEach(function() {
        // create a blog
        cy.createBlog({
          title: 'Go Developer Roadmap',
          author: 'Phil Jones',
          url: 'https://roadmap.sh/golang',
          likes: 0
        })
      })

      it('A blog can be liked', function() {
        // expand view
        cy.contains('view').click()

        // update like
        cy.contains('like').click()
        cy.contains('1')
      })

      it('A blog can be deleted', function() {
        // expand view
        cy.contains('view').click()

        // delete blog
        cy.contains('remove').click()
        cy.contains('Go Developer Roadmap Phil Jones').should('not.exist')
      })

      it.only('Remove button cannot be seen by another user', function() {
        // logout current user
        cy.contains('logout').click()

        // login for another user
        cy.login({ username: 'harry', password: '123456' })

        // expand view
        cy.contains('view').click()
        
        // remove button is not available
        cy.contains('remove').should('not.exist')
      })
    })
  })
})