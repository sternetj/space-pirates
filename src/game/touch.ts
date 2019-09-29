export default function keyboard(value?: "left" | "right") {
  let key = {
    value: value,
    isDown: false,
    isUp: true,
    press: () => {},
    release: () => {},
    shouldFire: (event: TouchEvent) => {
      return !value ||
      (value === "left" && event.touches[0].clientX < window.innerWidth / 2) ||
      (value === "right" && event.touches[0].clientX > window.innerWidth / 2)
    },

    downHandler: (event: TouchEvent) => {
      if (key.shouldFire(event)) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },

    upHandler: (event: TouchEvent) => {
      if (key.shouldFire(event)) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },

    unsubscribe: () => {
      window.removeEventListener("touchstart", downListener);
      window.removeEventListener("touchend", upListener);
    }
  };


  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  document.getElementsByTagName("canvas")[0].addEventListener("touchstart", () => downListener, false);
  document.getElementsByTagName("canvas")[0].addEventListener("touchend", () => upListener, false);

  return key;
}


