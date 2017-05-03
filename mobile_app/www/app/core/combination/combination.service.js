function Combination($resource) {
  return $resource('dist/:combinationId.json', {}, {
    query: {
      method: 'GET',
      params: {combinationId: 'combinations'},
      isArray: true
    }
  });
}