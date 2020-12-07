import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

  let valueX = 0;
  let valueY = 0;

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      valueX = coords.width + delta;
      $resizer.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - coords.bottom;
      valueY = coords.height + delta;
      $resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({ width: valueX + 'px' });
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = valueX + 'px'));
    } else {
      $parent.css({ height: valueY + 'px' });
    }
    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
