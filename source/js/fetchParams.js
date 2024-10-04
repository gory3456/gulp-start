export const fetchParams = async (url) => {
    const response = await fetch(url);

    let data = await response.json();
    return data;
}