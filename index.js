// 创建构造函数
function Game(option) {
  this.wrap = $(option.wrap)
  this.repetition = option.repetition || 4
  this.size = option.size || 4
  this.count = 0
  this.total = this.size * this.size
  this.fitSize()
  this.createBox()
  this.createImg()
  this.bindEvent()
}

// 确定容器大小
Game.prototype.fitSize = function () {
  var documentWidth = document.body.clientWidth
  if (documentWidth > 500) var wrapWidth = 500
  else var wrapWidth = documentWidth * 0.92
  this.wrap.width(wrapWidth)
  this.wrap.height(wrapWidth)
}

// 创建盒子
Game.prototype.createBox = function () {
  this.wrap.empty()
  var str = ''
  for (var i = 0; i < this.total; i++) {
      str += '<div class="box"><div class="front"><img src="img/defaul.jpg"></div><div class="back"><img src=""></div></div>'
  }
  this.wrap.append(str)
  var boxWidth = this.wrap.width() / this.size
  $('.box').width(boxWidth)
  $('.box').height(boxWidth)
  var index = 0
  for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
          $('.box').eq(index).css({
              top: i * boxWidth + 'px',
              left: j * boxWidth + 'px'
          });
          index++
      }
  }
};

// 创建图片
Game.prototype.createImg = function () {
  var picNum = this.total / this.repetition
  var imgArr = []
  for (var i = 0; i < picNum; i++) {
      for (var j = 0; j < this.repetition; j++) {
          imgArr.push(i)
      }
  }
  imgArr.sort(function () {
      return Math.random() > 0.5 ? 1 : -1
  })
  for (var i = 0; i < this.total; i++) {
      $('.box').eq(i).find('.back img').attr({
          'src': 'img/' + imgArr[i] + '.png',
          'index': imgArr[i]
      })
  }
}

// 绑定事件
Game.prototype.bindEvent = function () {
  var that = this
  this.wrap.off() // 防止重复绑定点击事件
  this.wrap.on('click', '.box', function () {
      if ($(this).hasClass('active')) {
          that.close($(this))
      } else {
          that.open($(this))
          if (that.count === 2) {
              var pic1 = $('.active').find('.back img').attr('index')
              var pic2 = $(this).find('.back img').attr('index')
              if (pic1 === pic2) {
                  $('.active').remove()
                  $(this).remove()
                  that.count = 0
                  if ($('.box').length === 0) {
                      $('#reveal').text('游戏结束，你真棒！').css('color', '#FA2F2F')
                  }
              } else {
                  that.close($('.active'))
                  $(this).addClass('active')
              }
          } else {
              $(this).addClass('active')
          }
      }
  })
}

// 翻开
Game.prototype.open = function (dom) {
  dom.find('.back').css({
      'transform': 'rotateY(0deg)',
      'webkitTransform': 'rotateY(0deg)',
      'mozTransform': 'rotateY(0deg)',
      'msTransform': 'rotateY(0deg)',
      'oTransform': 'rotateY(0deg)',
      'zIndex': 2
  })
  dom.find('.front').css({
      'transform': 'rotateY(180deg)',
      'webkitTransform': 'rotateY(180deg)',
      'mozTransform': 'rotateY(180deg)',
      'msTransform': 'rotateY(180deg)',
      'oTransform': 'rotateY(180deg)',
      'zIndex': 1
  })
  this.count++
}

// 闭合
Game.prototype.close = function (dom) {
  dom.find('.back').css({
      'transform': 'rotateY(-180deg)',
      'webkitTransform': 'rotateY(-180deg)',
      'mozTransform': 'rotateY(-180deg)',
      'msTransform': 'rotateY(-180deg)',
      'oTransform': 'rotateY(-180deg)',
      'zIndex': 1
  })
  dom.find('.front').css({
      'transform': 'rotateY(0deg)',
      'webkitTransform': 'rotateY(0deg)',
      'mozTransform': 'rotateY(0deg)',
      'msTransform': 'rotateY(0deg)',
      'oTransform': 'rotateY(0deg)',
      'zIndex': 2
  })
  dom.removeClass('active')
  this.count--
}

new Game({wrap: '#wrap'})

// 设置按钮宽度
var wrapWidth = $('#wrap').width()
$('.btns-bottom').width(wrapWidth)
$('.btn-bottom').width(wrapWidth / 2)
$('.option').width(wrapWidth / 3)

var size = 4
var repetition = 4

// 选择难度
$('.dropdown-ul').on('click', 'li', function() {
  size = $(this).attr('size')
  repetition = $(this).attr('repetition')
  $('.text').text(size * size / repetition + '图' + size + '×' + size)
  $('.dropdown-ul').hide()
  new Game({
      wrap: '#wrap',
      size: size,
      repetition: repetition
  })
  $('#reveal').text('消消看...').css('color', '#000')
})

// 显示隐藏下拉菜单
$('.dropdown-btn').click(function() {
  $('.dropdown-ul').toggle()
  return false
})
$(document).click(function() {
  $('.dropdown-ul').hide()
})

// 点击重玩
$('#reset').click(function() {
  new Game({
      wrap: '#wrap',
      size: size,
      repetition: repetition
  })
  $('#reveal').text('消消看...').css('color', '#000')
})