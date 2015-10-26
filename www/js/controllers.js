angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $timeout) {})

.controller('LoginCtrl', function ($scope, $timeout, $stateParams) {

    var mainid = $stateParams.id;
    design = [
        {
            name: "background",
            views: [
                "",
                "loginbackground",
                "pinkbackground"
            ]
        }, {
            name: "Slider",
            views: [
                "templates/elements/clear.html",
                "templates/elements/slider.html"
            ]
        },
        {
            name: "logo",
            views: [
                "templates/elements/clear.html",
                "templates/elements/logo.html"
            ]

        },
        {
            name: "input",
            views: [
                "templates/elements/clear.html",
                "templates/elements/input/boxed.html",
                "templates/elements/input/full.html",
                "templates/elements/input/icon.html"
            ]
        },
        {
            name: "social",
            views: [
                "templates/elements/clear.html",
                "templates/elements/social/boxed.html",
                "templates/elements/social/full.html",
                "templates/elements/social/side.html"
            ]
        },
    ];

    $scope.designTemplate = {};

    function assignDesignTemplate(arr) {
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            $scope.designTemplate[design[i].name] = design[i].views[arr[i]];
        }
        console.log($scope.designTemplate);
    }


    var TestString = decimalToAny(parseInt(mainid), design, [], 0, assignDesignTemplate);

    function decimalToAny(number, designArr, numArray, checks, callback) {
        var maxnumber = designArr[0].views.length;
        for (var i = 1; i < designArr.length; i++) {
            maxnumber = designArr[i].views.length * maxnumber;

        }
        if (number >= maxnumber) {
            number = maxnumber - 1;
            console.warn("Reached max number " + maxnumber);
        }

        var numberSystem = designArr[designArr.length - checks - 1].views.length;
        if (number < numberSystem) {
            numArray.unshift(number);

            if (designArr.length == numArray.length) {
                callback(numArray);
            } else {
                var diff = designArr.length - numArray.length;
                for (var i = 0; i < diff; i++) {
                    numArray.unshift(0);
                }
                callback(numArray);
            }
        } else {
            var newNumber = parseInt(number / numberSystem);
            numArray.unshift(number % numberSystem);
            decimalToAny(newNumber, designArr, numArray, ++checks, callback);
        }

    }




});