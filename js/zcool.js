/**
 * Created by hong on 2018/1/3.
 */
// $(function () {
//   $(".header-content li").click(function (event) {
//     console.log( $(".header-content li"));
//     var $index =$(".header-content li a").index(event.target)
//     var $height = $(".content-list li").height()
//     var $top =$height*$index
//     $(".content-list").css({
//        top: -$top+'px'
//     })
//   })
// })
$(function () {
  var $content = $("#wrap>.content")
  var $cList =$content.children(".content-list")
  var $cLiNodes = $cList.children("li")
  var $head = $("#wrap>.header")

  var $nList=$head.find(".header-content>ul>li")
  var $pList = $content.find(".sideNav>li")
  var $firstLiImg= $cList.find(".first-list img")

  var $secondLis = $cList.find(".second-list .second>.left>.photoList>li")
  var $secondLis1=$secondLis.eq(0)
  var $secondLis2=$secondLis.eq(1)
  var $secondLis3=$secondLis.eq(2)
  var $secondLiRight = $cList.find(".second-list .second>.right")

  var $thirdLis = $cList.find(".third-list .third>.left>.photoList>li")
  var $thirdLis1=$thirdLis.eq(0)
  var $thirdLis2=$thirdLis.eq(1)
  var $thirdLis3=$thirdLis.eq(2)
  var $thirdLiRight = $cList.find(".third-list .third>.right")

  var $fourLis = $cList.find(".four-list .four>.left>.photoList>li")
  var $fourLis1=$fourLis.eq(0)
  var $fourLis2=$fourLis.eq(1)
  var $fourLis3=$fourLis.eq(2)
  var $fourLiRight = $cList.find(".four-list .four>.right")

  var $fiveLis = $cList.find(".five-list .five>.left>.photoList>li")
  var $fiveLis1=$fiveLis.eq(0)
  var $fiveLis2=$fiveLis.eq(1)
  var $fiveLis3=$fiveLis.eq(2)
  var $fiveLiRight = $cList.find(".five-list .five>.right")

  var currentIndex =0
  var preIndex = 0
  var timer


  //出入
  var animations=[
    {
      in:cssTimeOut($firstLiImg,{opacity:1},1000),
      out:cssTimeOut($firstLiImg,{opacity:0},1000)
    },
    {
     in:function () {
       cssTimeOut($secondLis1,{transform:"translateY(0px)"},800)()
       cssTimeOut($secondLis2,{transform:"translateY(0px)"},1000)()
       cssTimeOut($secondLis3,{transform:"translateY(0px)"},1200)()
       cssTimeOut($secondLiRight,{transform:"translateY(0px)"},1200)()
     },
     out:function () {
       cssTimeOut($secondLis1,{transform:"translateY(800px)"},800)()
       cssTimeOut($secondLis2,{transform:"translateY(800px)"},1000)()
       cssTimeOut($secondLis3,{transform:"translateY(800px)"},1200)()
       cssTimeOut($secondLiRight,{transform:"translateY(-800px)"},1200)()
     }
    },
    {
      in:setTimeout(function () {
        $thirdLis2.css({transform:"translateX(0px)"})
        $thirdLis3.css({transform:"translateX(0px)"})
        $thirdLiRight.css({transform:"translateX(0px)"})
      },1000),
      out:setTimeout(function () {
        $thirdLis2.css({transform:"translateX(-279px)"})
        $thirdLis3.css({transform:"translateX(-538px)"})
        $thirdLiRight.css({transform:"translateX(300px)"})
      },1000)
    },
    {
     in:function () {
       $fourLis1.css({dispaly:"block",animation:'move 2s 0.5s'})
       $fourLis2.css({dispaly:"block",animation:'move 2s 0.5s'})
       $fourLis3.css({dispaly:"block",animation:'move 2s 0.5s'})
        setTimeout(function () {
          $fourLis1.css({transform:"translate(0px,0px)"})
          $fourLis2.css({transform:"translate(0px,0px)"})
          $fourLis3.css({transform:"translate(0px,0px)"})
          $thirdLiRight.css({opacity:1})
        },2000)
     },
      out:function () {
        $fourLis1.css({dispaly:"none",transform:"translate(330px,-1000px)"})
        $fourLis2.css({dispaly:"none",transform:"translate(0,-1000px)"})
        $fourLis3.css({dispaly:"none",transform:"translateX(330px,-1000px)"})
        $fourLiRight.css({opacity:0})
      }
    },
    {
      in:function () {
        cssTimeOut($fiveLis1,{transform:"translate3d(0,0,0) rotateX(0deg)"},800)()
        cssTimeOut($fiveLis2,{transform:"translate3d(0,0,0) rotateX(0deg)"},1000)()
        cssTimeOut($fiveLis3,{transform:"translate3d(0,0,0) rotateX(0deg)"},1200)()
        cssTimeOut($fiveLiRight,{opacity:0},1200)()
      }
    }

  ]
  $.each(animations,function (i) {
    i>0 && animations[i]["out"]()
  })



  //设置延迟函数
  function cssTimeOut($el,css,time) {
    return function () {
      setTimeout(()=>{
        $el.css(css)
      },time)

    }
  }
  //绑定监听
  function clickBind() {
    function clickFun($el) {
      return function () {
        var index = $el.index(this)
        preIndex=currentIndex
        move(index)
        currentIndex=index
      }
    }
    $pList.on("click",clickFun($pList))
    $nList.on("click",clickFun($nList))
  }
  //内容区高度
  function setContentHeight() {
    $content.height(document.documentElement.clientHeight-$head.outerHeight())
    $cLiNodes.height(document.documentElement.clientHeight-$head.outerHeight())
  }
  //同步主导航及侧边导航
  function move(index) {
    $nList.attr('class', '')
    $nList.eq(index).addClass('active')
    $pList.attr('class', '')
    $pList.eq(index).addClass('active')

    $cList.css({ top: -index * (document.documentElement.clientHeight - $head.outerHeight()) })
    animations[index] && animations[index]["in"] && animations[index]["in"]()
    animations[preIndex] && animations[preIndex]["out"] && animations[preIndex]["out"]()
  }
  
})


