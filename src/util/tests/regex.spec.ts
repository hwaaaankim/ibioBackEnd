
describe('regex test suite', () => {

  it('make sure a string exists in ', () => {
    const pattern = /\d{1,2}-\d{1,2}-\d{4}/
    expect(pattern.test('1-12-2020')).toBe(true)
  })

})