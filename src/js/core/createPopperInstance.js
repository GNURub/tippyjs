import Popper from 'popper.js'

import { SELECTORS } from './constants'

import getCorePlacement from '../utils/getCorePlacement'
import getOffsetDistanceInPx from '../utils/getOffsetDistanceInPx'

/**
* Creates a new popper instance
* @param {Object} ref
* @return {Object} - the popper instance
*/
export default function createPopperInstance(ref) {

    const {
        el,
        popper,
        settings: {
            position,
            popperOptions,
            offset,
            distance
        }
    } = ref

    const tooltip = popper.querySelector(SELECTORS.tooltip)

    const config = {
        placement: position,
        ...(popperOptions || {}),
        modifiers: {
            ...(popperOptions ? popperOptions.modifiers : {}),
            flip: {
                padding: distance + 5 /* 5px from viewport boundary */,
                ...(popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {})
            },
            offset: {
                offset,
                ...(popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
            }
        },
        onUpdate() {
            tooltip.style.top = ''
            tooltip.style.bottom = ''
            tooltip.style.left = ''
            tooltip.style.right = ''
            tooltip.style[
                getCorePlacement(popper.getAttribute('x-placement'))
            ] = getOffsetDistanceInPx(distance)
        }
    }

    return new Popper(el, popper, config)
}
