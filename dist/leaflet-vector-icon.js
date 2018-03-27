(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('leaflet')) :
  typeof define === 'function' && define.amd ? define(['leaflet'], factory) :
  (global.leafletVectorIcon = factory(global.L));
}(this, (function (leaflet) { 'use strict';

  var iconOptions = {
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [2, -40],
    shadowAnchor: [39, 45],
    shadowSize: [54, 51],
    className: 'vector-marker',
    prefix: 'fa',
    spinClass: 'fa-spin',
    extraIconClasses: '',
    extraDivClasses: '',
    icon: 'home',
    markerColor: 'blue',
    iconColor: 'white',
    viewBox: '0 0 32 52',
  };

  var defaultPin = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z';

  var VectorIcon = (function (Icon) {
    function VectorIcon(options) {
      Icon.call(this, options);

      leaflet.Util.setOptions(this, iconOptions);
      leaflet.Util.setOptions(this, options);
    }

    if ( Icon ) VectorIcon.__proto__ = Icon;
    VectorIcon.prototype = Object.create( Icon && Icon.prototype );
    VectorIcon.prototype.constructor = VectorIcon;

    VectorIcon.prototype.createIcon = function createIcon (oldIcon) {
      var div = (oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div'));
      var ref = this;
      var options = ref.options;
      var pinPath = options.mapPin || defaultPin;

      div.innerHTML = "<svg width=\"" + (options.iconSize[0]) + "px\" height=\"" + (options.iconSize[1]) + "px\" viewBox=\"" + (options.viewBox) + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"" + pinPath + "\" fill=\"" + (options.markerColor) + "\"></path></svg>";

      if (options.icon) {
        div.appendChild(this._createInner());
      }

      options.className += options.className.length > 0 ? ' ' + options.extraDivClasses : options.extraDivClasses;
      this._setIconStyles(div, 'icon');
      this._setIconStyles(div, ("icon-" + (options.markerColor)));

      return div;
    };

    VectorIcon.prototype.createShadow = function createShadow () {
      var div = document.createElement('div');
      this._setIconStyles(div, 'shadow');

      return div;
    };

    VectorIcon.prototype._createInner = function _createInner () {
      var i = document.createElement('i');
      var options = this.options;

      i.classList.add(options.prefix);

      if (options.extraClasses) {
        i.classList.add(options.extraClasses);
      }

      if (options.prefix) {
        i.classList.add(options.prefix + '-' + options.icon);
      } else {
        i.classList.add(options.icon);
      }

      if (options.spin && typeof options.spinClass === 'string') {
        i.classList.add(options.spinClass);
      }

      if (options.iconColor) {
        if (options.iconColor === 'white' || options.iconColor === 'black') {
          i.classList.add('icon-' + options.iconColor);
        } else {
          i.style.color = options.iconColor;
        }
      }

      if (options.iconSize) {
        i.style.width = options.iconSize[0] + 'px';
      }

      return i;
    };

    VectorIcon.prototype._setIconStyles = function _setIconStyles (img, name) {
      var ref = this;
      var options = ref.options;
      var size;
      var anchor;

      // get size and anchor coords
      if (name === 'shadow') {
        size = options.shadowSize;
        anchor = options.shadowAnchor || options.iconAnchor;
      } else {
        size = options.iconSize;
        anchor = options.iconAnchor;
      }

      // if anchor wasn't specified, default to one-half the size
      if (!anchor && size) {
        anchor = size.map(function (n) { return n / 2; });
      }

      img.className = "vector-marker-" + name + " " + (options.className);

      if (anchor) {
        img.style.marginLeft = (-anchor[0]) + "px";
        img.style.marginTop = (-anchor[1]) + "px";
      }

      if (size) {
        img.style.width = (size[0]) + "px";
        img.style.height = (size[1]) + "px";
      }
    };

    return VectorIcon;
  }(leaflet.Icon));

  return VectorIcon;

})));
//# sourceMappingURL=leaflet-vector-icon.js.map
