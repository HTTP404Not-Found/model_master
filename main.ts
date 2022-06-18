WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    OLED.writeStringNewLine("WIFI ok")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ok") {
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.servoWritePin(AnalogPin.P4, 180)
        pins.servoWritePin(AnalogPin.P3, 180)
        basic.pause(2050)
        pins.servoWritePin(AnalogPin.P3, 90)
        SmartCity.turn_white_led(1023, AnalogPin.P14)
        pins.digitalWritePin(DigitalPin.P10, 1)
    }
    if (receivedString == "bye") {
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.servoWritePin(AnalogPin.P4, 0)
        pins.servoWritePin(AnalogPin.P3, 0)
        basic.pause(2100)
        pins.servoWritePin(AnalogPin.P3, 90)
        pins.digitalWritePin(DigitalPin.P10, 0)
        SmartCity.turn_white_led(0, AnalogPin.P14)
    }
})
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("SPSS_IOT", "iot@spss")
OLED.init(128, 64)
radio.setGroup(1)
basic.forever(function () {
    WiFiIoT.sendThingspeak(
    "72U5E5U29FZF5V2E",
    SmartCity.read_light_sensor(AnalogPin.P1),
    SmartCity.readData(SmartCity.DHT11dataType.temperature, DigitalPin.P0)
    )
    basic.pause(1000)
})
