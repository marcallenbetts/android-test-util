const vorpal = require('vorpal')()
var shell = require('shelljs')

vorpal
  .command('send <text>', 'send text to attached android device')
  .action((args, callback) => {
    var text = args.text
    shell.exec('adb shell input text ' + text)
    callback()
  })

vorpal
  .command(
    'screenshot [filename]',
    'capture a screenshot with optional filename'
  )
  .action((args, callback) => {
    var filename = args.filename ? args.filename : 'screenshot'
    shell.exec('mkdir -p screenshots')
    shell.exec('adb exec-out screencap -p > ./screenshots/' + filename + '.png')
    callback()
  })

vorpal.command('devices', 'adb devices').action((args, callback) => {
  shell.exec('adb devices')
  callback()
})

vorpal
  .command('wifi', 'connect to device over wifi')
  .action((args, callback) => {
    var ip = shell.exec(
      "adb shell ip addr show wlan0  | grep 'inet ' | cut -d' ' -f6|cut -d/ -f1"
    ).stdout
    shell.exec('adb tcpip 5555')
    shell.exec('adb connect ' + ip)
    console.log(ip)
    callback()
  })

vorpal.delimiter('atu$').show()
