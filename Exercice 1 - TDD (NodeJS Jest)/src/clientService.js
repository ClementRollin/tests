let clients = [];
let idCounter = 1;

function resetClients() {
    clients = [];
    idCounter = 1;
}

/**
 * @param {Object} data - Client data
 * @returns {Object} Created client with ID
 */
function addClient(data) {
    const { firstName, lastName, email, phone, address, city, postalCode } = data;

    if (!firstName) throw new Error("firstName is required");
    if (!lastName) throw new Error("lastName is required");
    if (!email) throw new Error("email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("email is invalid");

    if (clients.some(c => c.email === email)) throw new Error("email must be unique");

    if (phone !== undefined) {
        const phoneRegex = /^\+\d+$/;
        if (!phoneRegex.test(phone)) throw new Error("phone is invalid");
    }

    const client = {
        id: idCounter++,
        firstName,
        lastName,
        email,
    };

    if (phone !== undefined) client.phone = phone;
    if (address !== undefined) client.address = address;
    if (city !== undefined) client.city = city;
    if (postalCode !== undefined) client.postalCode = postalCode;

    clients.push(client);
    return client;
}

/**
 * @param {number} id - Client ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated client
 */
function updateClient(id, updates) {
    const client = clients.find(c => c.id === id);
    if (!client) throw new Error("client not found");

    if (updates.email !== undefined) {
        const newEmail = updates.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) throw new Error("email is invalid");
        if (clients.some(c => c.email === newEmail && c.id !== id)) {
            throw new Error("email must be unique");
        }
        client.email = newEmail;
    }

    if (updates.phone !== undefined) {
        const phoneRegex = /^\+\d+$/;
        if (!phoneRegex.test(updates.phone)) throw new Error("phone is invalid");
        client.phone = updates.phone;
    }

    ['firstName', 'lastName', 'address', 'city', 'postalCode'].forEach(field => {
        if (updates[field] !== undefined) {
            client[field] = updates[field];
        }
    });

    return client;
}

/**
 * @param {number} id - Client ID
 */
function deleteClient(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) throw new Error("client not found");
    clients.splice(index, 1);
}

/**
 * @returns {Array} List of clients
 */
function getClients() {
    return [...clients];
}

module.exports = {
    resetClients,
    addClient,
    updateClient,
    deleteClient,
    getClients,
};