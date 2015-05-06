var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
	'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize', 'angular-md5'
]);
app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost/ca-cms-seed');
	// RestangularProvider.setRequestSuffix('?format=json');
});
;app.controller(
	"indexCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			scope.links = [];
			loadLinks();

			function loadLinks() {
				var Links = Restangular.all('about?format=json');
				Links.getList().then(function(links) {
					scope.links = links;
				});
			}

			scope.loadContent = function loadContent(content) {
				scope.content = content
			}
		}
	]
);
;app.controller(
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
;app.directive("header", function() {
	return {
		templateUrl: "app/partials/globals/header.html"
	}
});

// app.directive("carousel", function() {
//   return {
//     templateUrl: "app/partials/globals/carousel.html"
//   }
// });
app.directive('isActiveNav', ['$location', function($location) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			scope.location = $location;
			scope.$watch('location.path()', function(currentPath) {

				if ('#' + currentPath == element[0].hash) {
					element.parent().addClass('active');
				} else {
					element.parent().removeClass('active');
				}
			});
		}
	};
}]);
;app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/partials/home/index.html',
      controller: 'indexCtrl'
    })
    .state('setup', {
      url: '/setup',
      templateUrl: 'app/partials/setup/index.html',
      controller: 'setupCtrl'
    });
});
;angular.module('templates-dist', ['../app/partials/globals/header.html', '../app/partials/home/index.html', '../app/partials/setup/index.html']);

angular.module("../app/partials/globals/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/globals/header.html",
    "<nav id=\"main\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "      <ul>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"home\"><i class=\"fa fa-home\"></i>Home</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"setup\"><i class=\"fa fa-cog\"></i>Setup</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav >Link</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/home/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/home/index.html",
    "<div class=\"row\">\n" +
    "  <section class=\"content full\">\n" +
    "    <h1>Codeigniter Angular - CMS</h1>\n" +
    "    <div class=\"description\">\n" +
    "      \n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/setup/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/setup/index.html",
    "<form>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"\">Database Name</label>\n" +
    "    <div class=\"input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class='fa fa-database'></i></span>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"data.database\" placeholder=\"e.g my_blog\">\n" +
    "    </div>\n" +
    "    <a class='btn btn-create' ng-click=\"createDatabase()\"><i class=\"fa fa-bolt\"></i>Create Database</a>\n" +
    "    <alert ng-repeat=\"alert in alerts.database track by $index\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}} <p>{{$index}}</p></alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"\">Link / Section   <a class='btn btn-add' ng-click=\"addSection()\">Add Section</a> </label>\n" +
    "    <div class=\"input-group\" ng-repeat=\"link in links\">\n" +
    "      <span class=\"input-group-addon\"><i class='fa fa-list'></i></span>\n" +
    "      <input name=\"link.name\" ng-model=\"data.section[$index]\" type=\"text\" class=\"form-control\" placeholder=\"e.g contact us\">\n" +
    "    </div>\n" +
    "    <a class='btn btn-create' ng-click=\"createSection()\"><i class=\"fa fa-bolt\"></i>Create Section</a>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);
