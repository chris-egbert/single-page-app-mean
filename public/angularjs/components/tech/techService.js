define(['app'], function (app) {

  app.service('techService', ['techFactory', techService]);

  function techService(techFactory) {
    this._id = null;
    this.name = '';
    this.category = '';
    this.votes = 0;

    this.getData = function () {

    }

    this.save = function () {
      
    }
  }

});
