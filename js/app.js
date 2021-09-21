function reverseStr (str) {
  var listOfChars = str.split('')
  var reverseChar = listOfChars.reverse()
  var reverseStr = reverseChar.join('')

  return reverseStr
}

function isPalindrom (str) {
  var reverse = reverseStr(str)
  return str === reverse
}

function convertDateInStr (date) {
  var convertDate = {
    day: '',
    month: '',
    year: ''
  }
  if (date.day < 10) {
    convertDate.day = '0' + date.day
  } else {
    convertDate.day = date.day.toString()
  }
  if (date.month < 10) {
    convertDate.month = '0' + date.month
  } else {
    convertDate.month = date.month.toString()
  }
  convertDate.year = date.year.toString()

  return convertDate
}

function allTheFormatDate (date) {
  var convertDate = convertDateInStr(date)

  var ddmmyyyy = convertDate.day + convertDate.month + convertDate.year
  var mmddyyyy = convertDate.month + convertDate.day + convertDate.year
  var yyyymmdd = convertDate.year + convertDate.month + convertDate.day
  var ddmmyy = convertDate.day + convertDate.month + convertDate.year.slice(-2)
  var mmddyy = convertDate.month + convertDate.day + convertDate.year
  var yymmdd = convertDate.year.slice(-2) + convertDate.month + convertDate.day

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromDateFormat (date) {
  var palindromDateFormat = allTheFormatDate(date)

  var flag = false
  for (var i = 0; i < palindromDateFormat.length; i++) {
    if (isPalindrom(palindromDateFormat[i])) {
      flag = true
      break
    }
  }

  return flag
}

function isLeapYear (year) {
  if (year % 400 === 0) {
    return true
  }
  if (year % 100 === 0) {
    return true
  }
  if (year % 4 === 0) {
    return true
  }
  return false
}

function getNextDate (date) {
  var day = date.day + 1
  var month = date.month
  var year = date.year

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1
        month++
      }
    } else {
      if (day > 28) {
        day = 1
        month++
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1
      month++
    }
  }
  if (month > 12) {
    month = 1
    year++
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindrom (date) {
  var setcounter = 0
  var nextDate = getNextDate(date)
  while (1) {
    setcounter++
    var isPalindrom = checkPalindromDateFormat(nextDate)

    if (isPalindrom) {
      break
    }

    nextDate = getNextDate(nextDate)
  }
  return [setcounter, nextDate]
}
var birthDate = document.querySelector('#birth-date')
var submitBtn = document.querySelector('#check-button')
var outputDiv = document.querySelector('#output')

function clickHandler (e) {
  var dateOfBirth = birthDate.value

  if (dateOfBirth !== '') {
    var listOfDate = dateOfBirth.split('-')
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    }

    var isPalindrome = checkPalindromDateFormat(date)

    if (isPalindrome) {
      outputDiv.innerText = 'Yay! your birthday is a palindrome!!'
    } else {
      var [setcounter, nextDate] = getNextPalindrom(date)

      outputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${setcounter} days! 😔`
    }
  }
}
submitBtn.addEventListener('click', clickHandler)
