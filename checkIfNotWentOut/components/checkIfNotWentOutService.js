"use strict";

// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  metadata: () => ({
    name: "checkIfNotWentOutService",
    properties: {
      orderNumber: { required: true, type: "string" },
    },
    supportedActions: ["endUpdate", "resolveOrderCBE"],
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context
   */
  invoke: async (context, done) => {
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
          .reply("الأوردر خرج  لا يمكن التعديل")
          .reply("سعداء ب خدمة حضرتك");
        context.transition("endUpdate");
      } else {
        context.reply("تفضل ي افندم حضرتك عاوز تعدل اي ");
        context.keepTurn(true);
        context.transition("resolveOrderCBE");
        console.log("after transition");
      }
      done();
    } else {
      console.log("after transition");
      context.reply("الأوردر غير موجود ي افندم علي الرقم دا يا افندم");
      done();
    }
  },
};
