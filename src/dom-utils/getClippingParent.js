// @flow
import getScrollParent from './getScrollParent';
import getOffsetParent from './getOffsetParent';
import getParentNode from './getParentNode';
import getWindow from './getWindow';
import getDocumentElement from './getDocumentElement';

// A "clipping parent" is a scrolling container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from `initial`
export default function getClippingParent(
  element: HTMLElement,
  offsetElement?: Element
): HTMLElement {
  const scrollParent = getScrollParent(element);
  const offsetParent = offsetElement || getOffsetParent(element);
  const win = getWindow(element);

  return offsetParent === win
    ? getDocumentElement(element)
    : scrollParent.contains(offsetParent)
    ? scrollParent
    : getClippingParent(
        getScrollParent(getParentNode(scrollParent)),
        offsetParent
      );
}
