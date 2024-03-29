// https://codesandbox.io/s/simple-spring-animation-x2svy?from-embed=&file=/index.html
// https://www.kirillvasiltsov.com/writing/how-to-create-a-spring-animation-with-web-animation-api/

export const createSpringAnimation = (
  dx: number, 
  dy: number,
  stiffness: number = 600,
  damping: number = 7,
  mass: number = 1
) => {

  const DISPL_THRESHOLD = 3;

  if (dx === 0 && dy === 0) return { positions: [], frames: 0 };

  const spring_length = 0;
  const k = -stiffness;
  const d = -damping;
  const frame_rate = 1 / 60;

  let x = dx;
  let y = dy;

  let velocity_x = 0;
  let velocity_y = 0;

  let positions = [];

  let frames = 0;
  let frames_below_threshold = 0;
  let largest_displ;

  for (let step = 0; step <= 1000; step += 1) {
    let Fspring_x = k * (x - spring_length);
    let Fspring_y = k * (y - spring_length);
    let Fdamping_x = d * velocity_x;
    let Fdamping_y = d * velocity_y;

    let accel_x = (Fspring_x + Fdamping_x) / mass;
    let accel_y = (Fspring_y + Fdamping_y) / mass;

    velocity_x += accel_x * frame_rate;
    velocity_y += accel_y * frame_rate;

    x += velocity_x * frame_rate;
    y += velocity_y * frame_rate;

    positions.push({
      transform: `translate(${x}px, ${y}px)`
    });

    // Save the last largest displacement so that we can compare it with threshold later
    largest_displ =
    largest_displ && largest_displ < 0
        ? Math.max(largest_displ || -Infinity, Math.sqrt(x ** 2 + y ** 2))
        : Math.min(largest_displ || Infinity, Math.sqrt(x ** 2 + y ** 2));

    if (Math.abs(largest_displ) < DISPL_THRESHOLD) {
      frames_below_threshold += 1;
    } else {
      frames_below_threshold = 0; // Reset the frame counter
    }

    if (frames_below_threshold >= 60) {
      frames = step;
      break;
    }
  }

  if (frames === 0) {
    frames = 1000;
  }

  return { positions, frames };
}
