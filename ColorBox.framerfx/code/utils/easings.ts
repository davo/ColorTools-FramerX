import * as bezier from "bezier-easing"

export const curves = {
    easeInQuad: {
        name: "Quad - EaseIn",
        bezier: bezier(0.55, 0.085, 0.68, 0.53),
    },
    easeOutQuad: {
        name: "Quad - EaseOut",
        bezier: bezier(0.25, 0.46, 0.45, 0.94),
    },
    easeInOutQuad: {
        name: "Quad - EaseInOut",
        bezier: bezier(0.455, 0.03, 0.515, 0.955),
    },
    easeInQuart: {
        name: "Quart - EaseIn",
        bezier: bezier(0.895, 0.03, 0.685, 0.22),
    },
    easeOutQuart: {
        name: "Quart - EaseOut",
        bezier: bezier(0.165, 0.84, 0.44, 1),
    },
    easeInOutQuart: {
        name: "Quart - EaseInOut",
        bezier: bezier(0.77, 0, 0.175, 1),
    },
    easeInSine: {
        name: "Sine - EaseIn",
        bezier: bezier(0.47, 0, 0.745, 0.715),
    },
    easeOutSine: {
        name: "Sine - EaseOut",
        bezier: bezier(0.39, 0.575, 0.565, 1),
    },
    easeInOutSine: {
        name: "Sine - EaseInOut",
        bezier: bezier(0.445, 0.05, 0.55, 0.95),
    },
    easeInCubic: {
        name: "Cubic - EaseIn",
        bezier: bezier(0.55, 0.055, 0.675, 0.19),
    },
    easeOutCubic: {
        name: "Cubic - EaseOut",
        bezier: bezier(0.215, 0.61, 0.355, 1),
    },
    easeInOutCubic: {
        name: "Cubic - EaseInOut",
        bezier: bezier(0.645, 0.045, 0.355, 1),
    },
    easeInExpo: {
        name: "Expo - EaseIn",
        bezier: bezier(0.95, 0.05, 0.795, 0.035),
    },
    easeOutExpo: {
        name: "Expo - EaseOut",
        bezier: bezier(0.19, 1, 0.22, 1),
    },
    easeInOutExpo: {
        name: "Expo - EaseInOut",
        bezier: bezier(1, 0, 0, 1),
    },
    easeInQuint: {
        name: "Quint - EaseIn",
        bezier: bezier(0.755, 0.05, 0.855, 0.06),
    },
    easeOutQuint: {
        name: "Quint - EaseOut",
        bezier: bezier(0.23, 1, 0.32, 1),
    },
    easeInOutQuint: {
        name: "Quint - EaseInOut",
        bezier: bezier(0.86, 0, 0.07, 1),
    },
    easeInCirc: {
        name: "Circ - EaseIn",
        bezier: bezier(0.6, 0.04, 0.98, 0.335),
    },
    easeOutCirc: {
        name: "Circ - EaseOut",
        bezier: bezier(0.075, 0.82, 0.165, 1),
    },
    easeInOutCirc: {
        name: "Circ - EaseInOut",
        bezier: bezier(0.785, 0.135, 0.15, 0.86),
    },
    easeInBack: {
        name: "Back - EaseIn",
        bezier: bezier(0.6, -0.28, 0.735, 0.045),
    },
    easeOutBack: {
        name: "Back - EaseOut",
        bezier: bezier(0.175, 0.885, 0.32, 1.275),
    },
    easeInOutBack: {
        name: "Back - EaseInOut",
        bezier: bezier(0.68, -0.55, 0.265, 1.55),
    },
    linear: {
        name: "Linear",
        bezier: bezier(0.5, 0.5, 0.5, 0.5),
    },
}
