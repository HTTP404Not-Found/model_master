WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    OLED.writeStringNewLine("WIFI ok")
})
radio.onReceivedString(function (receivedString) {
    House.Turn180Servo(180, AnalogPin.P0)
    pins.servoWritePin(AnalogPin.P0, 180)
})
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("SPSS_IOT", "iot@spss")
OLED.init(128, 64)
radio.setGroup(1)
basic.forever(function () {
    House.readDHT11(DigitalPin.P0)
    WiFiIoT.sendThingspeak(
    "72U5E5U29FZF5V2E",
    SmartCity.read_light_sensor(AnalogPin.P1),
    House.readTemperatureData(House.Temp_degree.degree_Celsius)
    )
    basic.pause(1000)
})
