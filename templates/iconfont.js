!function (d) {
    var e, c = '<%=svgContent%>',
        t = (e = document.getElementsByTagName('script'))[e.length - 1].getAttribute('data-injectcss')
    if (t && !d.__iconfont__svg__cssinject__) {
        d.__iconfont__svg__cssinject__ = !0
        try {
            document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>')
        }
        catch (e) {
            console && console.log(e)
        }
    }
    !function (e) {
        if (document.addEventListener) if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(e, 0)
        else {
            var t = function () {
                document.removeEventListener('DOMContentLoaded', t, !1), e()
            }
            document.addEventListener('DOMContentLoaded', t, !1)
        }
        else document.attachEvent && (n = e, a = d.document, o = !1, i = function () {
            o || (o = !0, n())
        }, (c = function () {
            try {
                a.documentElement.doScroll('left')
            }
            catch (e) {
                return void setTimeout(c, 50)
            }
            i()
        })(), a.onreadystatechange = function () {
            'complete' == a.readyState && (a.onreadystatechange = null, i())
        })
        var n, a, o, i, c
    }(function () {
        var e, t, n, a, o, i;
        (e = document.createElement('div')).innerHTML = c, c = null, (t = e.getElementsByTagName('svg')[0]) && (t.setAttribute('aria-hidden', 'true'), t.style.position = 'absolute', t.style.width = 0, t.style.height = 0, t.style.overflow = 'hidden', n = t, (a = document.body).firstChild ? (o = n, (i = a.firstChild).parentNode.insertBefore(o, i)) : a.appendChild(n))
    })
}(window)