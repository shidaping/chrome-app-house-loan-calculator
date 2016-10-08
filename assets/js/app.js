(function(angular){
  debugger;
  var app = angular.module('app',[]);
  app.directive('singleSelect', [function(){

  }])
  app.controller('mainController', ['$scope','$timeout', function($scope, $timeout){
    $scope.hello="asdfsadf";
    $scope.alert = function(msg){
      $scope.boolAlertShow = true;
      $scope.alertMsg = msg;
      $timeout(function(){
        $scope.boolAlertShow = false;
      }, 2000);
    }
    $scope.formData={
      method: 'dengEBenXi'
    };
    $scope.calculate = function(){
      var formData = $scope.formData;
      debugger;
      if (!formData.yearRate || formData.yearRate<=0 || formData.yearRate >=100){
        $scope.alert('请输入正确的年利率')
        return;
      }
      if (!formData.loan || formData.loan < 1) {
        $scope.alert('请输入贷款额');
        return;
      }
      if (!formData.month || formData.month < 1) {
        $scope.alert('请输入贷款月份');
        return;
      }
      if (!formData.method) {
        $scope.alert('请选择还息方法');
        return;
      }
      if(formData.method === 'dengEBenXi'){
        $scope.calculate1();
      }else{
        $scope.calculate2();
      }

    }
    // 等额本息还款法:
    // 每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
    // 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
    // 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
    // 总利息=还款月数×每月月供额-贷款本金

    // 等额本息
    $scope.calculate1 = function(){
      var formData = $scope.formData;
      var yearRate = formData.yearRate/100;
      var monthRate = formData.yearRate/100/12;
      var loan = formData.loan;
      var month = formData.month;
      var data = [];
      var money =  ( loan * monthRate * Math.pow(1 + monthRate, month ) ) / ( Math.pow(1+monthRate, month) - 1);
      for(var i = 1;i<=month;i++){
        var item={};
        item.month = i;
        item.money = money
        data.push(item);
      }
      $scope.data = data;
      $scope.interestTotal = data[0].money * month - loan;
    }

    // 等额本金还款法:
    // 每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
    // 每月应还本金=贷款本金÷还款月数
    // 每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
    // 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
    // 总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额

    // 等额本金
    $scope.calculate2 = function(){
      var formData = $scope.formData;
      var yearRate = formData.yearRate/100;
      var monthRate = formData.yearRate/100/12;
      var loan = formData.loan;
      var month = formData.month;
      var data = [];
      for(var i = 1;i<=month;i++){
        var item={};
        item.month = i;
        item.money = (loan/month) + loan/month * ( month - i ) * monthRate ;
        data.push(item);
      }
      $scope.data = data;
      $scope.interestTotal =( (loan/month + loan * monthRate) + loan/month*(1+monthRate) )/2*month - loan;
    }

  }]);

})(angular)
