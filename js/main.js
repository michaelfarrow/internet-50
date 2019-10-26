
// var easing = require('jquery.easing')

new Blazy({
  loadInvisible: true
})

var $typeMe = $('.type-me')

$typeMe.each(function (typeI) {
  var finalLines = []
  var lines = $(this).html().split('<br>')
  $.each(lines, function (i, line) {
    finalLines[i] = []
  })

  var $originalContent =$('<div>').html($(this).html()).css('visibility', 'hidden');

  var $content = $('<div>').css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  })

  $(this).css('position', 'relative')

  $(this).html('')

  $(this).append($originalContent);
  $(this).append($content);

  var draw = function () {
    var finalStr = []
    $.each(finalLines, function (i, line) {
      finalStr.push(line.join(''))
    })
    $content.html(finalStr.join('<br>') + '<br>')
  }

  var inc = function () {
    var returnCode = 0
    $.each(lines, function (i, line) {
      if (line.length) {
        if (finalLines.length !== 0) finalLines[i].pop()
        var letter = ''
        var strLen = 1
        var found = false
        var special = false
        while(!found) {
          letter = line.substr(0, strLen)
          var lastLetter = letter.substr(-1)
          if (letter == '&' && !special) special = true
          if (!special ||
            lastLetter === ';' ||
            letter.length === line.length
          ) {
            found = true
          }
          strLen++
        }
        finalLines[i].push(letter)
        finalLines[i].push('|')
        lines[i] = line.substr(strLen - 1)
        returnCode = (lines[i].length === 0) ? -1 : 1
        if (returnCode === -1) finalLines[i].pop()
        return false
      }
    })
    draw()
    return returnCode
  }

  draw()

  $(this).addClass('typing')

  var doType = function () {
    var res = inc()
    if (res !== 0) {
      setTimeout(doType, (res === -1 ? 140 : 40) + (parseInt(Math.random() * 80)))
    }
  }

  var delay = $(this).data('delay') || 0
  setTimeout(function () {
    doType()
  }, delay * 1000)
})
