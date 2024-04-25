import * as todosApi from '@/src/service/fetch/todos';
import {
  FetchCreateTodoRequest,
  FetchPatchTodoRequest,
  FetchTodoListRequest,
  FetchTodoListResponse,
} from '@/src/interface/todos';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/todos', () => ({
  __esModule: true,
  fetchTodos: jest.fn(),
  fetchCreateTodo: jest.fn(),
  fetchUpdateTodo: jest.fn(),
  fetchPatchTodo: jest.fn(),
  fetchDeleteTodo: jest.fn(),
}));

describe('Todos API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchTodos', async () => {
    const mockTodos: FetchTodoListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'Todo one',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'Todo two',
        completed: true,
      },
    ];
    (todosApi.fetchTodos as jest.Mock).mockResolvedValue(mockTodos);

    const result = await todosApi.fetchTodos();
    expect(result).toEqual(mockTodos);
    expect(todosApi.fetchTodos).toHaveBeenCalledTimes(1);
  });

  test('fetchTodos', async () => {
    const payload: FetchTodoListRequest = {
      q: 'one',
    };
    const mockTodos: FetchTodoListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'Todo one',
        completed: false,
      },
    ];
    (todosApi.fetchTodos as jest.Mock).mockResolvedValue(mockTodos);

    const result = await todosApi.fetchTodos(payload);
    expect(result).toEqual(mockTodos);
    expect(todosApi.fetchTodos).toHaveBeenCalledTimes(1);
  });

  test('fetchCreateTodo', async () => {
    const mockNewTodoData: FetchCreateTodoRequest = {
      userId: 1,
      title: 'New Todo',
      completed: false,
    };
    (todosApi.fetchCreateTodo as jest.Mock).mockResolvedValue(undefined);

    const result = await todosApi.fetchCreateTodo(mockNewTodoData);
    expect(result).toBeUndefined();
    expect(todosApi.fetchCreateTodo).toHaveBeenCalledWith(mockNewTodoData);
  });

  test('fetchUpdateTodo', async () => {
    const mockTodoId = 1;
    const mockUpdatedTodoData: FetchCreateTodoRequest = {
      userId: 1,
      title: 'Updated Todo',
      completed: true,
    };
    (todosApi.fetchUpdateTodo as jest.Mock).mockResolvedValue(undefined);

    const result = await todosApi.fetchUpdateTodo(
      mockTodoId,
      mockUpdatedTodoData,
    );
    expect(result).toBeUndefined();
    expect(todosApi.fetchUpdateTodo).toHaveBeenCalledWith(
      mockTodoId,
      mockUpdatedTodoData,
    );
  });

  test('fetchPatchTodo', async () => {
    const mockTodoId = 1;
    const mockPatchData: FetchPatchTodoRequest = {
      title: 'Patched Todo',
      completed: true,
    };
    (todosApi.fetchPatchTodo as jest.Mock).mockResolvedValue(undefined);

    const result = await todosApi.fetchPatchTodo(mockTodoId, mockPatchData);
    expect(result).toBeUndefined();
    expect(todosApi.fetchPatchTodo).toHaveBeenCalledWith(
      mockTodoId,
      mockPatchData,
    );
  });

  test('fetchDeleteTodo', async () => {
    const mockTodoId = 1;
    (todosApi.fetchDeleteTodo as jest.Mock).mockResolvedValue(undefined);

    const result = await todosApi.fetchDeleteTodo(mockTodoId);
    expect(result).toBeUndefined();
    expect(todosApi.fetchDeleteTodo).toHaveBeenCalledWith(mockTodoId);
  });
});
