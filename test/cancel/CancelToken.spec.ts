import { Canceler } from '../../src/types'
import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'

describe('cancel:CancelToken', () => {
  describe('reason', () => {
    it('should returns a Cancel if cancellation has been requested', function() {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    it('should has no side effect if call cancellation for multi times', function() {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled.')
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    it('should returns undefined if cancellation has not been requested.', function() {
      const token = new CancelToken(() => {
        // do noting
      })
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    it('should returns a Promise that resolves when cancellation is requested', function(done) {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })

      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled.')
        done()
      })
      cancel!('Operation has been canceled.')
    })
  })

  describe('throwIfRequested', function() {
    it('should throws if cancellation has been requested', function() {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + thrown + '.')
        }
        expect(thrown.message).toBe('Operation has been canceled.')
      }
    })

    it('should does not throw if cancellation has not been requested', function() {
      const token = new CancelToken(() => {
        // do nothing
      })
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    it('should returns an object containing token and cancel function', function() {
      const source = CancelToken.source()

      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled.')
    })
  })
})
