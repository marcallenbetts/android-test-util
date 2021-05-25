const shell = require('shelljs')

module.exports = () => {
  return shell
    .exec(
      "adb shell ip addr show wlan0 | grep 'inet ' | cut -d' ' -f6 | cut -d/ -f1"
    )
    .stdout.replace(/\n/, '')
}
