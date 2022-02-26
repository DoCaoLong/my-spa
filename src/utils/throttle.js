export const throttle = (func, wait) => {
    let previous;
    let lastFunc;
    return function () {
        const context = this;
        const args = arguments;
        if (!previous) {
            func.apply(context, args);
            previous = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - previous >= wait) {
                    func.apply(context, args);
                    previous = Date.now();
                }
            }, wait - (Date.now() - previous));
        }
    };
};
