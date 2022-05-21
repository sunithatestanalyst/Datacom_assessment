/// <reference types="cypress" />

describe('Payees page tests',()=>{
    beforeEach(()=>{
        cy.visit('/client/', {
        headers: {
            "Accept-Encoding": "gzip, deflate"
          }
        });
        // Click Menu
        cy.get('.js-main-menu-btn').click();
        //Click Payees
        cy.get('.js-main-menu-payees > .Button').click();
    })
    it('TC1 - Verify payees page is loaded',()=>{
        // To verify payees page is loaded, Check url has text payees and
        cy.url().should('contain','payees');
        cy.get('.CustomPage-heading').should('contain.text','Payees');
    })

    it('TC2- Verify new payee is added successfully in the Payees page ',()=>{
        //click Add button
        cy.get(':nth-child(3) > .Button').should('be.visible').click();
        // Add payee pop up 
        cy.get('.js-modal-inner').should('be.visible');
        // Payee name 
        cy.get('#ComboboxInput-apm-name').type('tyco cylinder');
        cy.get('#cb-companyGroup').click();        
        //click Add
        cy.get('.js-submit').click();
        // Validation message
        cy.get('.message').should('be.visible').should('contain.text','Payee added');

    })

    it('TC3 - Verify Payee name is required field',()=>{

        //click Add button
        cy.get(':nth-child(3) > .Button').should('be.visible').click(); 
        // Add payee pop up 
        cy.get('.js-modal-inner').should('be.visible');
        //click Add
        cy.get('.js-submit').click();
        //Validation message
        cy.get('.error-header').should('contain.text','A problem was found. Please correct the field highlighted below');
        //Payee name
        cy.get('#ComboboxInput-apm-name').type('tyco cylinder');
        cy.get('#cb-companyGroup').click();
        //check for validation message
        cy.get('.error-header').should('not.exist');
        
    })
    it('TC4-Verify that payees can be sorted by name',()=>{
        //click Add button
        cy.get(':nth-child(3) > .Button').should('be.visible').click();
        // Add payee pop up 
        cy.get('.js-modal-inner').should('be.visible');
        // Payee name 
        cy.get('#ComboboxInput-apm-name').type('tyco cylinder');
        cy.get('#cb-companyGroup').click();        
        //click Add
        cy.get('.js-submit').click();
        // Validation message
        cy.get('.message').should('be.visible').should('contain.text','Payee added');
        // To verfy default sort
        var payeesList = []
        var payeesListToSort =[]
        var payeesListToReverse = []
        cy.get('.js-payee-name').each(($el,i)=>{
            payeesList[i]=$el.text();
            payeesListToSort[i]=$el.text();
            payeesListToReverse[i] = $el.text();
        }).then(()=>{             
            expect(payeesList).to.deep.equal(payeesListToSort.sort())
        })

        // Click on Name 
        cy.get('.js-payee-name-column').click();
        var payeesListDes = []       
        cy.get('.js-payee-name').each(($el,i)=>{
            payeesListDes[i]=$el.text();           
        }).then(()=>{             
            expect(payeesListDes).to.deep.equal(payeesListToReverse.reverse())
        })       
    })

})