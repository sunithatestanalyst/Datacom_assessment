// <reference types="cypress" />

describe('Payees page tests',()=>{
    beforeEach(()=>{
        cy.visit('/client/', {
        headers: {
            "Accept-Encoding": "gzip, deflate"
          }
        });
        // Click Menu
        cy.get('.js-main-menu-btn').click();
        
    })

    it('TC5-Transfer amount',()=>{

        //Get everyday balance
        var availBal: string
        cy.get('#account-ACC-1 > .account-info > .account-balance').then(($val)=>{
           var availBalance = $val.text();  
           availBal = availBalance.replace(/,/g, '');

        })
        //GEt Bills balance
        var availBalBills:string
        cy.get('#account-ACC-5 > .account-info > .account-balance').then(($vl)=>{
           var availBalanceBills =$vl.text();
           availBalBills = availBalanceBills.replace(/,/g, '');
        })
        //Click Pay transfer
        cy.get('.js-main-menu-paytransfer > .Button').click();
        //Select From
        cy.get('[data-testid="from-account-chooser"]').click();
        //select account
        cy.get(':nth-child(2) > .button-1-1-60').click();
        cy.get('[data-testid="to-account-chooser"]').click()
        cy.get('[data-testid="to-account-accounts-tab"]').click()
        cy.get('.list-1-1-76 > :nth-child(1) > button').click();        
        var everyCurrentBal: string      
        cy.get('#field-bnz-web-ui-toolkit-9').type('500')
        cy.get('.Button-component-106 > .Button-wrapper-98').click()
        cy.get('.message').should('contain.text','Transfer successful').should('be.visible')
        cy.get('#account-ACC-1 > .account-info > .account-balance').then(($at)=>{
         var eveyCurrentBal= $at.text();
         everyCurrentBal =eveyCurrentBal.replace(/,/g, '')
         var testBal = Number(availBal)-500            
         expect(Number(everyCurrentBal)).to.eq(testBal)
        })
        var billsCurrentBalance: string
        cy.get('#account-ACC-5 > .account-info > .account-balance').then(($at)=>{
            var billCurrentBal= $at.text();
            billsCurrentBalance =billCurrentBal.replace(/,/g, '')
            var testBal = Number(availBalBills)+500            
            expect(Number(billsCurrentBalance)).to.eq(testBal)
           })

    })
})