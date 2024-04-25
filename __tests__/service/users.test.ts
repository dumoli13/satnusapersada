import * as usersApi from '@/src/service/fetch/users';
import {
  FetchCreateUserRequest,
  FetchUserListRequest,
  FetchUserListResponse,
  UserDetail,
} from '@/src/interface/users';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/users', () => ({
  __esModule: true,
  fetchUsers: jest.fn(),
  fetchUserDetail: jest.fn(),
  fetchCreateUser: jest.fn(),
  fetchUpdateUser: jest.fn(),
  fetchDeleteUser: jest.fn(),
}));

describe('Users API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchUsers', async () => {
    const mockUsers: FetchUserListResponse = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    (usersApi.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const result = await usersApi.fetchUsers();
    expect(result).toEqual(mockUsers);
    expect(usersApi.fetchUsers).toHaveBeenCalledTimes(1);
  });

  test('fetchUsers', async () => {
    const payload: FetchUserListRequest = {
      q: 'Leanner',
    };
    const mockUsers: FetchUserListResponse = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    (usersApi.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const result = await usersApi.fetchUsers(payload);
    expect(result).toEqual(mockUsers);
    expect(usersApi.fetchUsers).toHaveBeenCalledTimes(1);
  });

  test('fetchUserDetail', async () => {
    const userId = '1';
    const mockUserDetail: UserDetail = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };
    (usersApi.fetchUserDetail as jest.Mock).mockResolvedValue(mockUserDetail);

    const result = await usersApi.fetchUserDetail(userId);
    expect(result).toEqual(mockUserDetail);
    expect(usersApi.fetchUserDetail).toHaveBeenCalledWith(userId);
  });

  test('fetchCreateUser', async () => {
    const newUser: FetchCreateUserRequest = {
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };
    (usersApi.fetchCreateUser as jest.Mock).mockResolvedValue(undefined);

    const result = await usersApi.fetchCreateUser(newUser);
    expect(result).toBeUndefined();
    expect(usersApi.fetchCreateUser).toHaveBeenCalledWith(newUser);
  });
});
