/*
 * @providesModule Constants
 */

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const epsilon = 0.000001;

const firebaseUrl = 'https://flubworld.firebaseio.com/game'

const debug = true;

const colors = {
  green: 0x00ff00,
  blue: 0x0000ff,
  lawnGreen: 0x387300,
  skyBlue: 0x99ccff,
  oceanBlue: 0x00008b,
  sand: 0xf9cda8,
  brown: 0x502805
}

export default {
  screenWidth,
  screenHeight,
  debug,
  colors,
  firebaseUrl
};