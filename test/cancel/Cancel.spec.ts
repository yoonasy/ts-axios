import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:cancel', () => {
  it('should returns correct result when message is specified', function() {
    const cancel = new Cancel('Operation has been canceled.')
  })

  it('should returns true if value is a Cancel', function() {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  it('should returns false if value is not a Cancel', function() {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
