#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const getIpAddress = require('./lib/ip')

program
  .command('text <text>')
  .description('send text to attached android device')
  .action((text) => {
    text.match(/([^\s]+|\s+)/g).forEach((c) => {
      if (/\s/.test(c)) {
        shell.exec('adb shell input keyevent 62')
      } else {
        shell.exec(`adb shell input text ${c}`)
      }
    })
  })

program
  .command('devices')
  .description('adb devices')
  .action(() => {
    shell.exec('adb devices')
  })

program
  .command('screenshot')
  .description('capture a screenshot with optional filename')
  .option('-n, --filename [filename]', 'filename', 'screenshot')
  .action((args) => {
    console.log(args)
    shell.exec(`adb exec-out screencap -p > ${args.filename}.png`)
  })

program
  .command('ip')
  .description('get device IP address')
  .action(() => {
    getIpAddress()
  })

program
  .command('wifi')
  .description('connect to device over wifi')
  .action(() => {
    const ip = getIpAddress()
    shell.exec('adb tcpip 5555')
    shell.exec(`adb connect ${ip}:5555`)
  })

program
  .command('disconnect')
  .description('disconnect wifi device')
  .action(() => {
    shell.exec('adb disconnect')
  })

program
  .command('rn')
  .alias('reverse')
  .description('set reverse socket connection for installing react native app')
  .action(() => {
    shell.exec('adb reverse tcp:8081 tcp:8081')
  })

program.parse(process.argv)
