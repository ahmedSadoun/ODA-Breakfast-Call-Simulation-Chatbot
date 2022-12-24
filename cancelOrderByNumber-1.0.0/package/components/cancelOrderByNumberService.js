"use strict";

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  metadata: () => ({
    name: "cancelOrderByNumberService",
    properties: {
      orderNumber: { required: true, type: "string" },
    },
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context
   */
  invoke: async (context, done) => {
    // Retrieve the value of the 'human' component property.
    const { orderNumber } = context.properties();
    let clientOrder = {};
    clientOrder.clientName = "احمد";
    clientOrder.clientAddress = "القاهره";
    clientOrder.clientPhoneNumber = "01003057274";
    clientOrder.order = "3 فول";
    clientOrder.orderNumer = "15"; //let x = Math.floor((Math.random() * 100) + 1);
    clientOrder.dateTime = Date.now;
    clientOrder.wentOut = true;
    clientOrder.deliverd = false;
    var list = [];
    list.push(clientOrder);
    clientOrder = list.find((order) => order.orderNumer === orderNumber);
    context.logger().info("hi there");
    if (clientOrder) {
      if (!clientOrder.wentOut) {
        context
          .reply("تم إلغاء اوردر حضرتك ي افندم")
          .reply("سعداء ب خدمة حضرتك");
      } else {
        context.reply("للأسف ي افندم الأوردر خرج مش هقدر الغيه ");
      }
      done();
    } else {
      context.reply("الأوردر غير موجود ي افندم علي الرقم دا يا افندم");
      done();
    }
  },
};
