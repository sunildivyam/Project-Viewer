angular.module('pvApp.directives')
.directive('dock', ['$timeout',function($timeout) {

	var DOCKS= {
		left: 'left',
		right: 'right',
		top: 'top',
		bottom: 'bottom'
	},
	DEFAULTS_DOCK = 'left',
	DEFAULTS_SIZE= '100',
	CLASS_NAME = 'dock',
	DEFAULT_UNIT = 'px',
	DEFAULT_OFFSET = 0,
	DEFAULT_TOGGLE_BUTTON_LABEL = 'Hide',
	PARENT_WIDTH,
	PARENT_HEIGHT;

	function initPanel(scope, element) {
		PARENT_WIDTH = element.parent().outerWidth();
		PARENT_HEIGHT = element.parent().outerHeight();
		scope.toggleButtonLabel = scope.toggleButtonLabel || DEFAULT_TOGGLE_BUTTON_LABEL;
		element.addClass(CLASS_NAME);
		element.css({'position': 'absolute', 'display': 'block', 'box-sizing':'border-box'});
		element.css({'transition-property': 'top right bottom left','transition-duration': '1s', 'transition-timing-function': 'cubic-bezier(0, 1, 0.5, 1)'});
        updatePanel(scope, element);
        if (!scope.toggleShow) {
            scope.localToggleShow = false;
        } else {
            scope.localToggleShow = true;
        }
	}

	function updatePanel(scope, element) {
		var dock = scope.dockPosition || DEFAULTS_DOCK,
			width, height,
			offsetX = scope.offsetX || DEFAULT_OFFSET,
			offsetY = scope.offsetY || DEFAULT_OFFSET,
			$slideButton = $(element.find('.slide-button'));
		switch (dock) {
			case DOCKS.top:
				width = scope.width ? (scope.width - offsetX) + DEFAULT_UNIT : PARENT_WIDTH - offsetX + DEFAULT_UNIT;
				height = (scope.height || DEFAULTS_SIZE) + DEFAULT_UNIT;
				element.css({'top': offsetY + DEFAULT_UNIT, 'left': offsetX + DEFAULT_UNIT, 'width': width, 'height': height});
                scope.prevPosition = offsetY + DEFAULT_UNIT;
				break;
			case DOCKS.right:
				width = (scope.width || DEFAULTS_SIZE) + DEFAULT_UNIT;
				height = scope.height ? (scope.height - offsetY) + DEFAULT_UNIT : PARENT_HEIGHT - offsetY + DEFAULT_UNIT;
				element.css({'top': offsetY + DEFAULT_UNIT, 'right': offsetX + DEFAULT_UNIT, 'width': width, 'height': height});
                scope.prevPosition = offsetX + DEFAULT_UNIT;
				break;
			case DOCKS.bottom:
				width = scope.width ? (scope.width - offsetX) + DEFAULT_UNIT : PARENT_WIDTH - offsetX + DEFAULT_UNIT;
				height = (scope.height || DEFAULTS_SIZE) + DEFAULT_UNIT;
				element.css({'bottom': offsetY + DEFAULT_UNIT, 'left': offsetX + DEFAULT_UNIT, 'width': width, 'height': height});
                scope.prevPosition = offsetY + DEFAULT_UNIT;
				break;
			default:
				width = (scope.width || DEFAULTS_SIZE) + DEFAULT_UNIT;
				height = scope.height ? (scope.height - offsetY) + DEFAULT_UNIT : PARENT_HEIGHT - offsetY + DEFAULT_UNIT;
				element.css({'top': offsetY + DEFAULT_UNIT, 'left': offsetX + DEFAULT_UNIT, 'width': width, 'height': height});
                scope.prevPosition = offsetX + DEFAULT_UNIT;
		}
	}

    function togglePanel(scope, element, toggleValue) {
        var sizeToSlide;
        switch (scope.dockPosition) {
            case DOCKS.top:
                if (toggleValue===false) {
                    sizeToSlide = element.css('height');
                    element.css('top', '-' + sizeToSlide);
                } else {
                    element.css('top', scope.prevPosition);
                }
                break;
            case DOCKS.right:
                if (toggleValue===false) {
                    sizeToSlide = element.css('width');
                    element.css('right', '-' + sizeToSlide);
                } else {
                    element.css('right', scope.prevPosition);
                }
                break;
            case DOCKS.bottom:
                if (toggleValue===false) {
                    sizeToSlide = element.css('height');
                    element.css('bottom', '-' + sizeToSlide);
                } else {
                    element.css('bottom', scope.prevPosition);
                }
                break;
            case DOCKS.left:
                if (toggleValue===false) {
                    sizeToSlide = element.css('width');
                    element.css('left', '-' + sizeToSlide);
                } else {
                    element.css('left', scope.prevPosition);
                }
                break;
        }
    }

    return {
    	scope: {
    		dockPosition: '@',
    		width: '=',
    		height: '=',
    		offsetX: '=',
    		offsetY: '=',
    		toggleShow: '=?toggleShow',
            toggleButtonLabel: '@'
    	},
        template: ['<div class="toggle-button common-btn" ng-click="toggleShowPanel($event)">{{toggleButtonLabel}}</div>',
        			'<div class="dock-content" ng-transclude="">'].join(""),
        restrict: "AE",
        transclude: true,
        link: function(scope, element, attrs, controller, transclude) {
        	$timeout(function(){
        		var $element = $(element),
	                $toggleShowBtn = $element.find('.toggle-button');

	        	scope.$watch('localToggleShow', function(newToggleValue, oldToggleValue) {
	        		if (newToggleValue!== undefined) {
	        			togglePanel(scope, $element, newToggleValue);
	        		}
	        	});

	            scope.$watch('toggleShow', function(newValue, oldValue, scope) {
	                scope.localToggleShow = newValue || false;
	            });

	            scope.toggleShowPanel = function(e) {
	                scope.localToggleShow = !scope.localToggleShow;
	            }
	            initPanel(scope, $element);
        	});
        }
    };
}]);
