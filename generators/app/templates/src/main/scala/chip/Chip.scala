package  <%= chipNameLower %>

import chisel3._

/**
  * You might want to use this space to explain the
  * basic functionality of your awesome new chip.
  */
class <%= chipName %> extends Module {
  val io = IO(new Bundle {
    // your input code will probably end up looking something like this:
    //
    // val value1      = Input(UInt(123.W))
    // val value2      = Input(UInt(123.W))
    // val outputValid = Output(Bool())
  })

  // this is probably where you'll implement the chip's innards 
}
