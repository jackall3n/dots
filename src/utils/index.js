export const random = (start, end) => {
    return Math.random() * end + start;
};

export const rgba = (r, g, b, a) => {
    return `rgba(${r}, ${g}, ${b}, ${a === undefined ? 1 : a})`;
};

export const bounds = (width, height, x, y) => {
    return {};
};

export const distance = (x1, y1, x2, y2) => {
    let a = x1 - x2;
    let b = y1 - y2;

    return Math.sqrt(a * a + b * b);
};

export const collision = (x1, y1, width, height, x2, y2) => {
    return x2 > x1 && x2 < x1 + width && y2 > y1 && y2 < y1 + height;
};
