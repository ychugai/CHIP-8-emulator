import './css/style.css';

import Chip8 from './js/chip8';
import CanvasRenderer from './js/renderer';

import './js/polyfills'

(function() {
  var CELL_SIZE = 8;
  
  var canvas = document.querySelector("canvas");


  // Instantiate our Chip-8 objects. 
  var ch = new Chip8();
  var chRenderer = new CanvasRenderer(canvas, ch.getDisplayWidth(), ch.getDisplayHeight(), CELL_SIZE);
          ch.setRenderer(chRenderer);

  
  // Set up program loading form.
          (function() {
            var select = document.querySelector("#program");
            var programLoaded = document.querySelector("#loaded-program");
            var programs = ["15PUZZLE", "BLINKY", "BLITZ", "BRIX", "CONNECT4", "GUESS", "HIDDEN", "IBM", "INVADERS", "KALEID", "MAZE", "MERLIN", "MISSILE", "PONG", "PONG2", "PUZZLE", "SYZYGY", "TANK", "TETRIS", "TICTAC", "UFO", "VBRIX", "VERS", "WIPEOFF"];

            programs.forEach(program => {
                var option = document.createElement("option");
                option.textContent = program;
                select.add(option);
            });

            select.addEventListener("change", function(event) {
                var value = select.value;
      
                if ( ! value) {
                    alert("Please select a ROM.");
                    return;
                }

                fetch(`http://localhost:3000/roms/${value}`)
                .then(res => res.json()).then(data => {
                  const arr = data.data;
                  console.log(arr)
                  // arr.forEach(el => el.toString(16));
                  const arr2 = arr.map(el => Number('0x' + (el+0x10000).toString(16).substr(-4).toUpperCase()))
                  // const arr3 = Uint8Array(arr2);
                  console.log(arr2);
                  ch.stop();
                  ch.reset();
                  ch.loadProgram(arr2);
                  ch.start();
                  console.log('sdf')
                  programLoaded.textContent = value;
                  return console.log('request')
                });

              //   var xhr = new XMLHttpRequest();
	            //         xhr.open("GET", `localhost:3000/roms/${value}`, true);
	            //         xhr.responseType = "arraybuffer";

	            //         xhr.onload = function () {
	            //             ch.stop();
							// ch.reset();
							// console.log(xhr.response)
	            //             ch.loadProgram(new Uint8Array(xhr.response));
	            //             ch.start();
							// programLoaded.textContent = value;
	            //         };
      this.blur();

            });
  
  })();
  
  
  


          // Key handling.
          (function() {
  
            var translateKeys = {
                49: 0x1,  // 1
                50: 0x2,  // 2
                51: 0x3,  // 3
                52: 0x4,  // 4
                81: 0x5,  // Q
                87: 0x6,  // W
                69: 0x7,  // E
                82: 0x8,  // R
                65: 0x9,  // A
                83: 0xA,  // S
                68: 0xB,  // D
                70: 0xC,  // F
                90: 0xD,  // Z
                88: 0xE,  // X
                67: 0xF,  // C
                86: 0x10  // V
            };

            document.addEventListener("keydown", function(event) {
                ch.setKey(translateKeys[event.keyCode]);
            });

            document.addEventListener("keyup", function(event) {
                ch.unsetKey(translateKeys[event.keyCode]);
            });
  })();
  
  // FPS support.
  (function() {
    var fpsOutput = document.querySelector("#fps");
    setInterval(function() {
      fpsOutput.textContent = chRenderer.getFps().toPrecision(2);
    }, 1e3);
    
  })();

      })();