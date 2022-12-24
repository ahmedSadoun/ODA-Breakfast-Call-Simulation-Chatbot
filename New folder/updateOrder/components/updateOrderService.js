"use strict";

// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  metadata: () => ({
    name: "updateOrderService",
    properties: {
      order: { required: true, type: "string" },
    },
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context
   */
  invoke: async (context, done) => {
    const { order } = context.properties();
    let orderList = [];
    orderList.push(creatOrder());
    orderList.push(creatOrder(order));
    context.reply(`تم إضافة ${order} الي الأوردر بتاع حضرتك`);
    done();
  },
};

function creatOrder(order) {
  let clientOrder = {};
  clientOrder.clientName = "احمد";
  clientOrder.clientAddress = "القاهره";
  clientOrder.clientPhoneNumber = "01003057274";
  clientOrder.order = order ? order : " فول";
  clientOrder.orderNumer = "15"; //let x = Math.floor((Math.random() * 100) + 1);
  clientOrder.dateTime = Date.now;
  clientOrder.wentOut = false;
  clientOrder.deliverd = false;
  return clientOrder;
}
