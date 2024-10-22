export const fetchParams = async (url) => {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

export const createOrder = async (url, data) => {
	try {
		const response = await fetch(url, {
			mode: 'no-cors',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error creating order:', error);
		throw error;
	}
};