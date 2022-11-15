require('./date')

test('dd MM yyyy date formatting', () => {

    const date = new Date(2022, 5, 12)

    expect(date.yyyymmdd()).toBe('12 June 2022')
    date.setMonth(12)
    expect(date.yyyymmdd()).toBe('12 January 2023')
})