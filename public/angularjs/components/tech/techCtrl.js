define(['app'], function (app) {

  // The main Tech Controller
  app.controller('techCtrl', ['$scope', '$modal', '$modalStack', 'techFactory', function($scope, $modal, $modalStack, techFactory) {

    $scope.tech = new techFactory();

    $scope.techs = [];

    $scope.testCount = 0;

    $scope.categoryOptions = $scope.tech.getCategoryOptions();

    // Get the list of techs
    $scope.refreshTechs = function () {
      $scope.techs = techFactory.query();
    };
    
    $scope.refreshTechs();

    // Notification for some other controller changing tech data - the Modal controller uses this after an add
    $scope.$on('tech-change', function(event, tech) {
      $scope.refreshTechs();
    });

    // Setup Modal for showing the add form
    $scope.showModal = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'techModalView.html',
        controller: 'techAddCtrl',
        scope: $scope,
        size: size
      });
    };

    // Get voted items from local storage
    $scope.getTechVotes = function() {
      var voteData = localStorage.getItem('techVotes');
      if (!voteData) {
        techVotes = [];
      } else {
        techVotes = JSON.parse(voteData);
      }

      console.log("Tech Votes:");
      console.log(techVotes);
      return techVotes;
    }

    // Add Tech Vote to local storage
    $scope.addTechVote = function (tech) {
      var techVotes = $scope.getTechVotes();
      console.log("Adding Tech ID to local storage:");
      console.log(tech);
      techVotes.push(tech._id);
      localStorage.setItem('techVotes', JSON.stringify(techVotes));
    }

    // Vote for a tech
    $scope.vote = function (tech) {
      tech.votes++;
      $scope.addTechVote(tech);
      tech.$update(function () {
        $scope.refreshTechs();
      });
    }

    $scope.votedForTech = function (tech) {
      if ($.inArray(tech._id, $scope.getTechVotes()) == -1) {
        return false;
      } else {
        return true;
      }
    }

  }]);

  // Tech Add Modal
  app.controller('techAddCtrl', ['$scope', '$modal', '$modalStack', '$rootScope', 'techFactory', function ($scope, $modal, $modalStack, $rootScope, techFactory) {

    $scope.tech = new techFactory();

    $scope.create = function() {
        $modalStack.dismissAll();
        $scope.tech.$save(function (response) {
          $rootScope.$broadcast('tech-change', $scope.tech);
        });
        
    }

  }]);


  // Tech Vote Directive
  app.directive('techVote', techVoteDirective);

  function techVoteDirective() {
    return {
      templateUrl: 'techVoteTemplate.html'
    };
  };

});


