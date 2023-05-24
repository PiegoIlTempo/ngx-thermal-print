/**
 * @Author: Zhenxiang Chen
 * @Date:   2021-12-04 14:41:53
 * @Last Modified by:   Costardi Paolo @ Tech-Farm Srl
 * @Last Modified time: 2023-05-24 18:26:05
 */
import { PrintService, UsbDriver, BluetoothDriver } from "ngx-thermal-print";
import { Component } from "@angular/core";
import { PrintDriver } from "ngx-thermal-print/lib/drivers/PrintDriver";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  status: boolean = false;
  usbPrintDriver: UsbDriver;
  bluetoothDriver: BluetoothDriver;
 // networkDriver: NetworkDriver;
  ip: string = "10.83.118.160";

  constructor(private printService: PrintService) {
    this.usbPrintDriver = new UsbDriver();
    this.bluetoothDriver = new BluetoothDriver();

    this.printService.isConnected.subscribe((result) => {
      this.status = result;
      if (result) {
        console.log("Connected to printer!!!");
      } else {
        console.log("Not connected to printer.");
      }
    });
  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(
      (result) => {
        this.printService.setDriver(this.usbPrintDriver);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  requestBluetooth() {
    this.bluetoothDriver.requestBluetooth().subscribe(
      (result) => {
        this.printService.setDriver(this.bluetoothDriver);
      },
      (error) => {
        console.log(error);
      }
    );
  }
/*
  connectToNetwork() {
    this.networkDriver = new NetworkDriver(this.ip);
    this.printService.setDriver(this.networkDriver);
  }*/

  print() {
    this.printService
      .init()
      .setBold(true)
      .writeLine("Hello World!")
      .setBold(false)
      .feed(4)
      .cut("full")
      .flush();
  }
}
