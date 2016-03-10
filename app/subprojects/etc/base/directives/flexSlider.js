angular.module("pvApp.directives")
.directive('flexSlider', ['$timeout', function($timeout){
    // Runs during compile
    return {
        scope:{
            options : '='
        },

        link: function(scope, element, attrs) {

            var defaultOptions = {                                             // Defining the default options of flexslider
                useCSS: true,
                animation : 'slide',
                animationLoop : true,
                pauseOnHover: true,
                slideshow : true,
                directionNav : true,
                controlNav : false,
                pauseOnAction: false,
                itemWidth: 600,
                itemMargin: 5,
                prevText: "",
                nextText: "",
                slideshowSpeed: 2000
            };
            scope.$watch("options", function(options){
                // If the element is having more than one slide, then combines both "options" as well as "defaultoptions"
                // and stores inside the flexoptions.
                if ($(element).find('ul.slides>li').length>1){
                    var flexOptions = angular.extend({},defaultOptions,options);
                    element.flexslider(flexOptions);
                }
            });
        }// END LINK
    }; // END
}]);