angular.module('timer', [])
.controller('timerController',['$scope',function($scope){
    $scope.time = '00 : 00 : 00';
    $scope.my_input = {'time' :0, event: ''};
    //var duration = moment.duration(time * 6000, 'milliseconds');
    var interval = 1;
    $scope.schedule = [];
    $scope.currentEvent = 'No Current Event';
    var idxCounter = 0;
    $scope.startblink = false;
    var duration = moment.duration({
        'seconds': 0,
        'hour' :0 ,
        'minutes': 0
    });

    $scope.addToSchedule = function(){
        if ($scope.my_input.time <= 0 || $scope.my_input.event === '' ) return;
        $scope.schedule.push($scope.my_input);
        $scope.my_input = {'time' :0, event: ''};
    };
    
    $scope.nextClicked = function(){
        idxCounter++;
        clearInterval($scope.refreshIntervalId);
        if(idxCounter === $scope.schedule.length) return;
        $scope.startblink = false;
        $scope.start();
    }
    
    $scope.start = function(){
        
        if($scope.schedule.length === 0 ) return;
        localStorage.setItem('orginalCache', JSON.stringify($scope.schedule));
        var duration = moment.duration({
            'seconds': 0,
            'hour':0 ,
            'minutes':$scope.schedule[idxCounter].time
        });
        
        $scope.currentEvent = $scope.schedule[idxCounter].event;
        $scope.refreshIntervalId = setInterval(function(){
        $scope.disable = true;
        duration = moment.duration(duration.asSeconds() - interval, 'seconds');
          //duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
          //show how many hours, minutes and seconds are left
          $scope.time =  ((duration.hours() < 10 ? '0' : '') + duration.hours()) + ' : ' + ((duration.minutes() < 10 ? '0' : '') + duration.minutes()) + ' : ' + ((duration.seconds() < 10 ? '0' : '' ) + duration.seconds());
          /*if(duration.hours() === 0 && duration.minutes() <= 2){
              if($scope.startblink !== true){
                  $scope.startblink = true;
              }
           }*/

           if(duration.hours() === 0 && duration.minutes() <= 0 && duration.seconds() <= 0){
                $scope.startblink = true;
                $scope.stop();
           }
            
          $scope.$apply();
      }, 1000);
  };

  $scope.stop = function(){
      //This only happens when the button is clicked a second time to go back to no event screen
      if($scope.currentEvent === 'No Current Event'){
            delete $scope.disable;
            $scope.startblink = false;
            idxCounter = 0;
            return;
      }
      
      $scope.time = '00 : 00 : 00';
      clearInterval($scope.refreshIntervalId);
      $scope.currentEvent = 'No Current Event';
  };


}]);

/*
if(duration <= 0 && idxCounter <= $scope.schedule.length){
    idxCounter++;
    duration = moment.duration({
        'seconds': 0,
        'hour':0 ,
        'minutes':$scope.schedule[idxCounter].time
    });
    $scope.startblink = false;
    $scope.currentEvent = $scope.schedule[idxCounter].event;
}
*/
