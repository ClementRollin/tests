const mockCreate = jest.fn();
const mockRetrieve = jest.fn();
const mockUpdate = jest.fn();
const mockDel = jest.fn();

jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
        customers: {
            create: mockCreate,
            retrieve: mockRetrieve,
            update: mockUpdate,
            del: mockDel,
        },
    }));
});

const Stripe = require('stripe');
const {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../src/stripeService');

afterEach(() => {
    jest.clearAllMocks();
});

describe('createCustomer', () => {
    it('should throw if data is not an object', async () => {
        await expect(createCustomer(null)).rejects.toThrow(
            'Invalid data: an object is required to create a customer'
        );
    });

    it('should call stripe.customers.create with valid data', async () => {
        const fakeCustomer = { id: 'cus_123', email: 'a@b.com' };
        mockCreate.mockResolvedValue(fakeCustomer);

        const data = { email: 'a@b.com', name: 'Alice' };
        const result = await createCustomer(data);

        expect(mockCreate).toHaveBeenCalledWith(data);
        expect(result).toBe(fakeCustomer);

    });

    it('should wrap stripe errors', async () => {
        mockCreate.mockRejectedValue(new Error('Stripe error'));

        await expect(createCustomer({ email: 'a@b.com' })).rejects.toThrow(
            /Failed to create customer: Stripe error/
        );

    });
});

describe('getCustomer', () => {
    it('should throw if no customerId', async () => {
        await expect(getCustomer()).rejects.toThrow('Customer ID is required');
    });

    it('should throw when customer not found or deleted', async () => {
        mockRetrieve.mockResolvedValue({ deleted: true });
        await expect(getCustomer('cus_123')).rejects.toThrow('Customer not found');
    });

    it('should return customer when found', async () => {
        const fakeCustomer = { id: 'cus_123', email: 'a@b.com', deleted: false };
        mockRetrieve.mockResolvedValue(fakeCustomer);

        const result = await getCustomer('cus_123');
        expect(mockRetrieve).toHaveBeenCalledWith('cus_123');
        expect(result).toBe(fakeCustomer);

    });

    it('should wrap stripe errors', async () => {
        mockRetrieve.mockRejectedValue(new Error('Stripe fetch failed'));
        await expect(getCustomer('cus_123')).rejects.toThrow(
            /Failed to get customer: Stripe fetch failed/
        );
    });
});

describe('updateCustomer', () => {
    it('should throw if no customerId', async () => {
        await expect(updateCustomer()).rejects.toThrow('Customer ID is required');
    });

    it('should throw if data is not object', async () => {
        await expect(updateCustomer('cus_1', null)).rejects.toThrow(
            'Invalid data: an object is required to update a customer'
        );
    });

    it('should call stripe.customers.update with valid args', async () => {
        const fakeCustomer = { id: 'cus_1', name: 'Bob' };
        mockUpdate.mockResolvedValue(fakeCustomer);

        const updates = { name: 'Bob Updated' };
        const result = await updateCustomer('cus_1', updates);

        expect(mockUpdate).toHaveBeenCalledWith('cus_1', updates);
        expect(result).toBe(fakeCustomer);

    });

    it('should wrap stripe errors', async () => {
        mockUpdate.mockRejectedValue(new Error('Stripe update failed'));
        await expect(updateCustomer('cus_1', {})).rejects.toThrow(
            /Failed to update customer: Stripe update failed/
        );
    });
});

describe('deleteCustomer', () => {
    it('should throw if no customerId', async () => {
        await expect(deleteCustomer()).rejects.toThrow('Customer ID is required');
    });

    it('should throw if delete response deleted=false', async () => {
        mockDel.mockResolvedValue({ deleted: false });
        await expect(deleteCustomer('cus_1')).rejects.toThrow(
            'Customer could not be deleted'
        );
    });

    it('should return true when deleted', async () => {
        mockDel.mockResolvedValue({ deleted: true });
        const result = await deleteCustomer('cus_1');

        expect(mockDel).toHaveBeenCalledWith('cus_1');
        expect(result).toBe(true);

    });

    it('should wrap stripe errors', async () => {
        mockDel.mockRejectedValue(new Error('Stripe delete failed'));
        await expect(deleteCustomer('cus_1')).rejects.toThrow(
            /Failed to delete customer: Stripe delete failed/
        );
    });
});