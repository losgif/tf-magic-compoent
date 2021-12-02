export default {
  'POST /appApi/getComponentName': (req, res) => {
    res.send({
      code: 0,
      msg: 'success',
      count: 0,
      data: {
        componentName: 'ComponentA',
      },
    });
  },
};
