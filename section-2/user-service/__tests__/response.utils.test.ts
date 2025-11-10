import { formatResponse, generateId } from '../src/utils/response.utils';

describe('Response Utils', () => {
  describe('formatResponse', () => {
    it('should format successful response with data', () => {
      const data = { id: 1, name: 'Test' };
      const response = formatResponse(true, data, 'Success message');

      expect(response).toEqual({
        success: true,
        data: data,
        message: 'Success message'
      });
    });

    it('should format error response', () => {
      const response = formatResponse(false, null, undefined, 'Error message');

      expect(response).toEqual({
        success: false,
        error: 'Error message'
      });
    });

    it('should handle response with no optional fields', () => {
      const response = formatResponse(true);

      expect(response).toEqual({
        success: true
      });
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1).not.toBe(id2);
    });
  });
});