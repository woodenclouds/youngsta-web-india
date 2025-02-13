let timer:any;
export default function debounce(fn:()=>void, delay:string) {
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

export function formatDate(date:Date) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} '${year}`;
}