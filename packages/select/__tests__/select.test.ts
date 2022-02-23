import { selectTypeConverter } from '..'

describe('@tf-magic/select', () => {
  it('selectTypeConverter', () => {
    const value = {
      10: '杭州',
      20: '温州',
      30: '金华',
      40: '绍兴'
    }

    expect(selectTypeConverter(value)).toEqual([
      {
        name: '杭州',
        value: '10'
      },
      {
        name: '温州',
        value: '20'
      },
      {
        name: '金华',
        value: '30'
      },
      {
        name: '绍兴',
        value: '40'
      }
    ])
  });
});
