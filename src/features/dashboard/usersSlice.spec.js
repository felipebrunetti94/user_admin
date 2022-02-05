import usersReducer, {
  remove,
  edit,
  create,
  cancel
} from './usersSlice';

describe('users reducer', () => {
  const initialState = {
    status: 'idle',
    current: null,
    ids: [],
    entities: {}
  };
  it('should handle initial state', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle cancel', () => {
    const actual = usersReducer(initialState, cancel());
    expect(actual.status).toEqual('idle');
  });

  it('should handle create', () => {
    const actual = usersReducer(initialState, create());
    expect(actual.status).toEqual('create');
  });

  it('should handle edit', () => {
    const actual = usersReducer(initialState, edit({ id: 'test' }));
    expect(actual.status).toEqual('edit');
  });

  it('should handle remove', () => {
    const actual = usersReducer(initialState, remove({ id: 'test' }));
    expect(actual.status).toEqual('remove');
  });
});
