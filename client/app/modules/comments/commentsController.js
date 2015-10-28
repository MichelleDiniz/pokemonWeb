'use strict';

function CommentsController($scope, md5){
  $scope.comments = [];

  $scope.addComment = function(comment) {
    comment.avatar = md5.createHash(comment.email.trim().toLowerCase() || '');
    $scope.date = new Date();
    $scope.comments.push(angular.copy(comment));
    // $scope.comments.username = '';
    // $scope.comments.email = '';
    // $scope.comments.txt = '';
  };

  $scope.removeComment = function($index) {
      $scope.comments.splice($index, 1);
  };
}

CommentsController.$inject = ['$scope', 'md5'];

angular.module('commentsModule', [
  'ngMd5'
  ])
  .controller('CommentsController', CommentsController);
