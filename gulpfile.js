const pinyin = require('word-pinyin').default
const gulp = require('gulp')
const del = require('del')
const iconfont = require('gulp-iconfont')
const rename = require('gulp-rename')
const fs = require('fs')
const template = require('gulp-template')
const svgstore = require('gulp-svgstore')
const through2 = require('through2')
const htmlmin = require('gulp-htmlmin')
const path = require('path')

const outputPath = './iconfont' // 输出路径
const iconfontConf = {
    svgPath: '.', // svg 文件夹路径（当前文件夹）
    fontName: 'fe-font', // font-family
    prefix: 'fe', // class 前缀 和 symbol id 前缀
    templateCSSPath: path.resolve(__dirname, './templates/iconfont.css'), // css 模板的路径
    templateHTMLPath: path.resolve(__dirname, './templates/iconfont-example.html'), // iconfont example html path
    outputCSSPath: outputPath, // css 输出路径,这个路径是相对 outputPath的路径（我也不知道为什么）
    fontsPathInCSS: './fonts/', // iconfont.css 中引入font文件时用到的相对路径
    outputFontsPath: `${outputPath}/fonts`, // 字体文件输出路径
    outputHTML: `${outputPath}`, // 输出html demo的路径
    startUnicode: 0xEA01, // 编码开始点
}

const symbolConf = Object.assign({}, iconfontConf, {
    templateJSPath: path.resolve(__dirname, './templates/iconfont.js'), // js 模板的路径
    outputJS: outputPath, // 输出js文件的路径
    templateHTMLPath: path.resolve(__dirname, './templates/symbol-example.html'), // symbol example html path
})

// 转化中文到拼音
// 插入 prefix 前缀
function fixIconName(oriName) {
    const pinyinName = pinyin.getPinyin(oriName)
        .toString()
        .replace(/,/g, '')
        .replace(/ /g, '')
        .replace('.svg', '')
    return `${iconfontConf.prefix}-${pinyinName}`
}

// 返回所有svg文件的文件名
function getIcons() {
    let icons = fs.readdirSync('./')
    icons = icons.filter(name => name.endsWith('.svg'))
        .map(fixIconName)
    return icons
}

/**
 * @param options.fontName // font-family
 * @param options.prefix // class 前缀 或 symbol id 前缀
 * @param options.startUnicode // 16进制
 */
gulp.config = (options) => {
    Object.assign(iconfontConf, options)
    Object.assign(symbolConf, options)
}

// 清空文件
gulp.task('del', function () {
    return del(['./iconfont/*'])
})

// 生成 iconfont 字体文件
// 生成 iconfont.css 文件
gulp.task('iconfont', function () {
    function genCSS(glyphs, options) {
        gulp.src(iconfontConf.templateCSSPath)
            .pipe(template({
                fontPath: iconfontConf.fontsPathInCSS,
                fontName: iconfontConf.fontName,
                prefix: iconfontConf.prefix,
                glyphs,
            }))
            .pipe(gulp.dest(iconfontConf.outputCSSPath))
    }

    return gulp.src(`${iconfontConf.svgPath}/**/*.svg`)
        .pipe(rename(function (path) {
            path.basename = fixIconName(path.basename)
        }))
        .pipe(iconfont({
            fontName: iconfontConf.fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            options: {
                fixedWidth: false,
                normalize: false,
                fontHeight: 512,
                descent: -32,
                normalize: true,
                startUnicode: iconfontConf.startUnicode,
            },
        }))
        .on('glyphs', genCSS)
        .pipe(gulp.dest(iconfontConf.outputFontsPath))
})

// 生成示例代码
gulp.task('iconfont-example', function () {
    return gulp.src(iconfontConf.templateHTMLPath)
        .pipe(template({
            icons: getIcons(),
            fontName: iconfontConf.fontName
        }))
        .pipe(gulp.dest(iconfontConf.outputHTML))
})

// 生成 iconfont.js 文件
gulp.task('symbol', function () {
    return new Promise((resolve) => {
        gulp.src(`${symbolConf.svgPath}/**/*.svg`)
            .pipe(rename(function (path) {
                path.basename = fixIconName(path.basename)
            }))
            .pipe(svgstore({inlineSvg: true}))
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(through2.obj(function (file) {
                resolve(file.contents.toString())
            }))
    })
        .then(spriteSvg => {
            gulp.src(symbolConf.templateJSPath)
                .pipe(template({
                    svgContent: spriteSvg,
                }))
                .pipe(gulp.dest(symbolConf.outputJS))
        })
})

// 生成 示例代码
gulp.task('symbol-example', function () {
    return gulp.src(symbolConf.templateHTMLPath)
        .pipe(template({
            icons: getIcons(),
        }))
        .pipe(gulp.dest(symbolConf.outputHTML))
})

// 运行这个task，生成 iconfont
gulp.task('gen-iconfont', gulp.parallel('del', 'iconfont', 'iconfont-example'))

// 运行这个task，生成 smybol
gulp.task('gen-symbol', gulp.parallel('del', 'symbol', 'symbol-example'))

module.exports = gulp