app.controller(
  "setupCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {

      scope.links = [];
      scope.data = [];
      scope.alerts = [];
      scope.alerts.database = [];
      loadSection();

      var setup = Restangular.all('setup');

      function loadSection() {
        scope.links = [{
          'name': 'intial'
        }];
      }

      scope.addSection = function addSection() {
        scope.links.push({
          'name': 'next'
        });
      }

      scope.createSections = function createSections() {
        console.log(scope.data.section);
      }
      scope.closeAlert = function(index) {
        scope.alerts.database.splice(index, 1);
      };

      scope.createDatabase = function createDatabase() {
        // scope.alerts.database = [];
        setup.all('database').post(scope.data.database).then(function(
          response) {
          alert = {
            type: response.type,
            msg: response.msg
          };
          console.log(alert)
          if (alert != '') {
            scope.alerts.database.push(alert);
          }
          console.log(scope.alerts.database);

        });
      }
    }
  ]
);
