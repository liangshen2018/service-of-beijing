// import unknown from '@/assets/icon_images/unknown.png'
// import boy from '@/assets/icon_images/boy.png'
// import girl from '@/assets/icon_images/girl.png'

// /**
//  * 如果患者头像不存在，根据患者性别返回头像
//  * @export
//  * @param {*} sex 患者性别=
//  * @returns 患者头像
//  */
// export function paramAvatar(sex) {
//     switch (sex) {
//         case '1':
//             return boy
//         case '2':
//             return girl
//         case '3':
//             return unknown
//         default:
//             return unknown
//     }
// }

/**
 *
 * 转化性别
 * @export
 * @param {*} sex
 * @returns
 */
export function formatSex(sex) {
    sex = +sex
    switch (sex) {
        case 1:
            return '男'
        case 2:
            return '女'
        case 3:
            return '未知'
        default:
            return ''
    }
}

export function isNotANumber(inputData) {
    // isNaN(inputData)不能判断空串或一个空格
    // 如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
    if (parseFloat(inputData).toString() === 'NaN') {
        // alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
        return false
    } else {
        return true
    }
}

/**
 * 格式化年龄
 * 入参 总天数 days
 * 1、小于三个月的显示几周几天，(days<3*30)
 * 2、小于1岁的显示几月龄几天，	(3*30<=days<1*365)
 * 3、大于一岁的显示几岁几月龄，(1*365<=days<6*365)
 * 4、大于六岁的只显示岁。		(days>=6*365)
 */
export function getBabyAge(birthDay) {
    if (!birthDay) {
        return ''
    }
    const date1 = new Date(birthDay.replace(/-/g, '/').replace(/\.0/g, ''))
    const date2 = new Date()
    const s1 = date1.getTime()
    const s2 = date2.getTime()
    const total = (s2 - s1) / 1000
    const days = parseInt(total / (24 * 60 * 60)) // 两日期之间的差（天数）
    let age = ''
    if (days < 3 * 30) {
        const week = parseInt(days / 7)
        const day = parseInt(days % 7)
        if (week !== 0) age += week + '周'
        else {
            if (day !== 0) age += day + '天'
            else age += day + '天'
        }
        // age += day + '天'
    } else if (days < 1 * 365) {
        const month = parseInt(days / 30.4)
        const day = parseInt(days % 30.4)
        if (month !== 0) age += month + '月龄'
        if (day !== 0) age += day + '天'
    } else if (days < 6 * 365) {
        const year = parseInt(days / 365)
        const month = parseInt((days % 365) / 30.4)
        if (year !== 0) age += year + '岁'
        if (month !== 0) age += month + '月龄'
    } else {
        const year = parseInt(days / 365)
        if (year !== 0) age += year + '岁'
    }
    return age
}

export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

/**
 * 对象转换成key value 编码字符串
 * @export
 * @param {*} json 传入待转换json对象
 * @returns
 */
export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

/**
 * 格式化参数
 * @param {String} str 待格式化的字符串
 * @param {*} type 字符串类型（type === 'url' 网址参数）
 */
export function param2Obj(str, type = 'params') {
    if (type === 'url') {
        str = str.split('?')[1]
    }
    if (!str) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(str)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export const pickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now() - 8.64e6
    },
    shortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            }
        },
        {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            }
        },
        {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            }
        }
    ]
}

// 格式化时间(只能选之前的)
export const defaultPickOpts = {
    opts: {
        disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
        }
    },
    opts2: pickerOptions,
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd 00:00:00'
}

// 格式化时间(只能选之后的)
export const defaultPickOptsAfter = {
    opts: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
        }
    },
    opts2: pickerOptions,
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd 00:00:00'
}

export const disabledPickerOpts = {
    disabledDate(time) {
        return time.getTime() > Date.now() - 8.64e6
    }
}

// 格式化用法
export function formatRouteName(val) {
    switch (val) {
        case '1':
            return '口服'
        case '2':
            return '皮下注射'
        case '3':
            return '皮内注射'
        case '4':
            return '肌内注射'
        case '5':
            return '静脉注射'
        case '6':
            return '静脉滴注'
        case '7':
            return '腹腔注射'
        case '8':
            return '滴眼'
        case '9':
            return '滴耳'
        case '10':
            return '滴鼻'
        case '11':
            return '吸入'
        case '12':
            return '贴'
        case '13':
            return '外用'
        case '14':
            return '喷'
        case '15':
            return '含漱'
        case '16':
            return '舌下含服'
        case '17':
            return '直肠给药'

        default:
            return ''
    }
}

// 格式化频率
export function formatFrequency(val) {
    switch (val) {
        case '1':
            return 'qd(每日一次)'
        case '2':
            return 'bid(每日两次)'
        case '3':
            return 'qid(每日)'
        case '4':
            return 'qod(隔日一次)'
        case '5':
            return 'qw(每周一次)'
        case '6':
            return 'biw(每周两次)'
        case '7':
            return 'tiw(每周三次)'
        case '8':
            return 'qow(隔周一次)'
        case '9':
            return '2w(每两周一次)'
        case '10':
            return '3w(每三周一次)'
        case '11':
            return '4w(每四周一次)'
        case '12':
            return 'q1/2h(30分钟一次)'
        case '13':
            return 'qh(每小时一次)'
        case '14':
            return 'q2h(二小时一次)'
        case '15':
            return 'q3h(三小时一次)'
        case '16':
            return 'q4h(四小时一次)'
        case '17':
            return 'q6h(六小时一次)'
        case '18':
            return 'q8h(八小时一次)'
        case '19':
            return 'q12h(12小时一次)'
        default:
            return ''
    }
}

/**
 * 从对象中删除指定key值
 * @export
 * @param {*} obj
 * @param {*} arr
 */
export function deleteKeys(obj, arr) {
    if (!obj || obj.constructor !== Object) {
        return
    }
    if (!arr || arr.constructor !== Array || arr.constructor !== String) {
        return
    }
    if (arr.constructor === Array) {
        arr.forEach(key => {
            if (obj[key]) {
                delete obj[key]
            }
        })
    } else {
        if (obj[arr]) {
            delete obj[arr]
        }
    }
    return obj
}

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
export function uniqueArray(array, key) {
    var result = [array[0]]
    for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
            if (item[key] === result[j][key]) {
                repeat = true
                break
            }
        }
        if (!repeat) {
            result.push(item)
        }
    }
    return result
}

export function exportExcelCb(content, fileName) {
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}

/**
 * 转换日期
 * @export
 * @param {*} d
 * @returns
 * 默认YYYY-MM-DD
 * flag = false YYYY-MM-dd HH:mm:ss
 */
export function formatDate(d, flag = true) {
    const date = d ? new Date(d) : new Date()
    let temp = ''
    if (!flag) {
        temp =
            ' ' +
            (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) +
            ':' +
            (date.getMinutes() > 9
                ? date.getMinutes()
                : '0' + date.getMinutes()) +
            ':' +
            (date.getSeconds() > 9
                ? date.getSeconds()
                : '0' + date.getSeconds())
    }
    return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : '0' + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        temp
    )
}
