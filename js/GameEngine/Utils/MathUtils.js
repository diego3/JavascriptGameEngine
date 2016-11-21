var MathUtils = {
    limit: function (x, min, max) {
        return Math.max(min, Math.min(max, x));
    },
    between: function (n, min, max) {
        return ((n >= min) && (n <= max));
    },
    accelerate: function (v, accel, dt) {
        return v + (accel * dt);
    },
    lerp: function (n, dn, dt) {   // linear interpolation
        return n + (dn * dt);   },
    interpolate: function (a, b, percent) {
        return a + (b - a) * percent;
    },
    easeIn: function (a, b, percent) {
        return a + (b - a) * Math.pow(percent, 2);
    },
    easeOut: function (a, b, percent) {
        return a + (b - a) * (1 - Math.pow(1 - percent, 2));
    },
    easeInOut: function (a, b, percent) {
        return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
    },
};