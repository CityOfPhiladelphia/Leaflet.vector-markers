// console.log('index.js vector icon')

import { Util, Point, Icon } from 'leaflet';

const iconOptions = {
  iconSize: [100, 100],
  iconAnchor: [50, 50],
  popupAnchor: [2, -40],
  shadowAnchor: [39, 45],
  shadowSize: [54, 51],
  className: 'vector-marker',
  prefix: 'fa',
  spinClass: 'fa-spin',
  extraIconClasses: '',
  extraDivClasses: '',
  icon: 'home',
  markerColor: 'red',
  iconColor: 'white',
  viewBox: '0 0 32 52',
};

export default class VectorIcon extends Icon {
  constructor(options) {
    // console.log('constructor')
    if (options.icon.size) {
      // console.log('options.icon.size:', options.icon.size);
      const size = options.icon.size;
      // options.iconSize = [10, 10];
      // options.iconAnchor = [5, 5];
      options.iconSize = [size*2, size*2];
      options.iconAnchor = [size, size];
      // options.shadowSize = [size, size];
      // options.shadowAnchor = [size-size*0.2, size-size*0.1];
    } else {
      options.icon.size = 50;
    }
    // console.log('iconOptions:', iconOptions, 'options:', options);
    super(options);
    Util.setOptions(this, iconOptions);
    Util.setOptions(this, options);
  }

  createIcon(oldIcon) {
    const div = (oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div'));
    const { options } = this;
    const icon = options.icon;
    div.innerHTML = `<i class="` + icon.prefix + ` fa-` + icon.icon + `" style="color:` + options.markerColor + `; width: ` + icon.size + `px; height: `+ icon.size + `px"></i>`;


    options.className += options.className.length > 0 ? ' ' + options.extraDivClasses : options.extraDivClasses;
    this._setIconStyles(div, 'icon');
    this._setIconStyles(div, `icon-${options.markerColor}`);

    return div;
  }

  createShadow() {
    const { options } = this;
    // console.log('createShadow is running, options:', options);
    if (options.icon.shadow == true) {
      // console.log('createShadow if is running');
      const div = document.createElement('div');
      this._setIconStyles(div, 'shadow');
      // const size = options.icon.size;
      // div.style.boxshadow = size + 'px -10px 10px rgba(0,0,0,0.4)'
      return div;
    }
    // else {
    //   return;
    // }
  }

    // document.getElementsByClassName("vector-marker-shadow").style["boxShadow"] = "0 0 5px #999999";

  // _createInner() {
  //   const i = document.createElement('i');
  //   const options = this.options;
  //
  //   i.classList.add(options.prefix);
  //
  //   if (options.extraClasses) {
  //     i.classList.add(options.extraClasses);
  //   }
  //
  //   if (options.prefix) {
  //     i.classList.add(options.prefix + '-' + options.icon);
  //   } else {
  //     i.classList.add(options.icon);
  //   }
  //
  //   if (options.spin && typeof options.spinClass === 'string') {
  //     i.classList.add(options.spinClass);
  //   }
  //
  //   if (options.iconColor) {
  //     if (options.iconColor === 'white' || options.iconColor === 'black') {
  //       i.classList.add('icon-' + options.iconColor);
  //     } else {
  //       i.style.color = options.iconColor;
  //     }
  //   }
  //
  //   if (options.iconSize) {
  //     i.style.width = options.iconSize[0] + 'px';
  //   }
  //
  //   return i;
  // }

  _setIconStyles(img, name) {
    const { options } = this;
    let size;
    let anchor;

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
      anchor = size.map(n => n / 2);
    }

    img.className = `vector-marker-${name} ${options.className}`;

    if (anchor) {
      img.style.marginLeft = `${-anchor[0]}px`;
      img.style.marginTop = `${-anchor[1]}px`;
    }

    if (size) {
      img.style.width = `${size[0]}px`;
      img.style.height = `${size[1]}px`;
    }

    // this.testFunc()
  }

  // testFunc() {
  //   console.log('testFunc is running');
  //   document.getElementsByClassName("vector-marker-shadow").style["boxShadow"] = "0 0 5px #999999";
  // }
};
