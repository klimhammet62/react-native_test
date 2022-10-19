export const useDebounce = (func, delay, setIsLoading) => {
    let timeout;
    return function (...args) {
        const fnCall = () => {
            func.apply(this, args)
        }
        clearTimeout(timeout, setIsLoading(true));
        timeout = setTimeout(fnCall, delay)
    };
}