export const useDebounce = (func, delay) => {
    let timeout;
    return function (...args) {
        const fnCall = () => {
            func.apply(this, args)
        }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay)
    };
}