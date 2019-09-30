import axios from '../src'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should add a download progress handler', function() {
    const progressSpy = jest.fn()

    axios('/foo', { onDownloadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  it('should add a upload progress handler', function() {
    const progressSpy = jest.fn()

    axios('/fop', { onUploadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      // jasmine Ajax doesn't trigger upload events
      // TODO waiting for jest-ajax fix
      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
