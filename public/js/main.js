$.get({
    url: "/recipes",
    success: function( result ) {
        let s = JSON.stringify(result);
        $('#json').append(s);
    }
  });