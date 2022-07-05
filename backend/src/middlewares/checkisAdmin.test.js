import CustomError from '../utils/CustomError';
import checkIsAdmin from './checkIsAdmin';

describe('checkIsAdmin middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();
  const expectedError = new CustomError(401, 'Unauthorized access');

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  test('without headers', async () => {
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('without "authorization" header', async () => {
    mockRequest = {
      headers: {},
    };
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('with userrole: guest in header', async () => {
    mockRequest = {
      header: jest.fn('userrole').mockReturnValue('guest'),
    };
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('with userrole: admin in header', async () => {
    mockRequest = {
      header: jest.fn('userrole').mockReturnValue('admin'),
    };
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith();
  });
});
