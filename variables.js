var canvas = document.getElementById('gamewindow'),
    ctx = canvas.getContext('2d');

var GAME,oasis;

const PX_SIZE = 12;
const GRID = 4*PX_SIZE;

const 	C_HEIGHT = canvas.height = GRID * 8,
	C_WIDTH  = canvas.width  = GRID * 12

const COLORS = {

  ORANGE:'#f8b800',
  RED	:'#f87858',
  BLUE	:'#58f898',
  D_BLUE:'#004058'

}