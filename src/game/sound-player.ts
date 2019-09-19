import Sound from "pixi-sound";
import { ship } from "../assets/sounds/ship";

export default {
  ship: Sound.Sound.from(_base64ToArrayBuffer(ship))
};

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
