$.get({
  url: '/recipes',
  success: function( result ) {
    const s = JSON.stringify(result);
    $('#json').append(s);
  },
});
