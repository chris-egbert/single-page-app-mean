define(['app'], function(app) {

  app.factory('menuFactory', ['$window', menuFactory]);

  function menuFactory($window) {
    return {
      'initMenu': function () {
                    var navbarInstance = '';
                    navbarInstance += '<Navbar brand="React-Bootstrap" toggleNavKey={0}>';
                    navbarInstance += '<Nav right eventKey={0}> {/* This is the eventKey referenced */}';
                    navbarInstance += '<NavItem eventKey={1} href="#">Link</NavItem>';
                    navbarInstance += '<NavItem eventKey={2} href="#">Link</Nav';
                    navbarInstance += '</Nav>';
                    navbarInstance += '</Navbar>';
                    navbarInstance += '';



                    // React.render(navbarInstance, document.getElementById('nav'));
                  }
    }
  }

});
