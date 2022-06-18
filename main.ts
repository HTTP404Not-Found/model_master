WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    OLED.writeStringNewLine("WIFI ok")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ok") {
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.servoWritePin(AnalogPin.P10, 180)
        pins.servoWritePin(AnalogPin.P4, 180)
        basic.pause(1500)
        pins.servoWritePin(AnalogPin.P4, 90)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(1000)
    }
    if (receivedString == "bye") {
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.servoWritePin(AnalogPin.P10, 0)
        pins.servoWritePin(AnalogPin.P4, 0)
        basic.pause(1500)
        pins.servoWritePin(AnalogPin.P4, 90)
        strip.clear()
    }
})
let strip: neopixel.Strip = null
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("SPSS_IOT", "iot@spss")
OLED.init(128, 64)
radio.setGroup(1)
strip = neopixel.create(DigitalPin.P0, 1, NeoPixelMode.RGB)
let range = strip.range(0, 1)
pins.servoWritePin(AnalogPin.P10, 0)
basic.forever(function () {
    House.readDHT11(DigitalPin.P0)
    WiFiIoT.sendThingspeak(
    "72U5E5U29FZF5V2E",
    SmartCity.read_light_sensor(AnalogPin.P1),
    House.readTemperatureData(House.Temp_degree.degree_Celsius)
    )
    basic.pause(1000)
})
