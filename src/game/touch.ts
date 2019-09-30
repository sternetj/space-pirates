export default function keyboard(value?: "left" | "right") {
  let key = {
    value: value,
    isDown: false,
    isUp: true,
    press: () => {},
    release: () => {},
    shouldFire: (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!value) return true;
      if (touch) {
        return (
          (value === "left" && touch.pageX < window.innerWidth / 2) ||
          (value === "right" && touch.pageX > window.innerWidth / 2)
        );
      }

      return false;
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
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    },

    unsubscribe: () => {
      window.removeEventListener("touchstart", downListener);
      window.removeEventListener("touchend", upListener);
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("touchstart", downListener, false);
  window.addEventListener("touchend", upListener, false);

  return key;
}
