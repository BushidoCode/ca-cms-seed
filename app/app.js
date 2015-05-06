var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
	'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize', 'angular-md5'
]);
app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost/ca-cms-seed');
	// RestangularProvider.setRequestSuffix('?format=json');
});
