'use strict';

import './css/style.css';

import Chip8 from './js/chip8';
import CanvasRenderer from './js/renderer';

import callApi from './js/helpers/apiHelper';

import translateKeys from './js/constants/translateKeys'
import programs from './js/constants/programs'

(() => {
  const CELL_SIZE = 12;
  const canvas = document.querySelector('canvas');

  const ch = new Chip8();
  const chRenderer = new CanvasRenderer(canvas, ch.getDisplayWidth(), ch.getDisplayHeight(), CELL_SIZE);
  ch.setRenderer(chRenderer);

  const select = document.querySelector('#program');
  const programLoaded = document.querySelector('#loaded-program');
  
  programs.forEach(program => {
    const option = document.createElement('option');
    option.textContent = program;
    select.add(option);
  });

  select.addEventListener('change', () => {
    const value = select.value;
    if (!value) {
      alert('Please select a ROM.');
      return;
    }

    callApi(value, 'GET')
      .then(data => {
        const buffer = data.data.map(el => Number('0x' + (el + 0x10000).toString(16).substr(-4).toUpperCase()));
        ch.stop();
        ch.reset();
        ch.loadProgram(buffer);
        ch.start();
        programLoaded.textContent = value;
      });
  });

  document.addEventListener('keydown', event => ch.setKey(translateKeys[event.keyCode]));
  document.addEventListener('keyup', event => ch.unsetKey(translateKeys[event.keyCode]));
})();
