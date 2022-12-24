"use strict";

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  metadata: () => ({
    name: "getAFoodOrderByNumberService",
    properties: {
      orderNumber: { required: true, type: "string" },
      intent: { required: true, type: "string" },
    },
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context
   */
  invoke: async (context) => {
    // extract incomming variables
    const { orderNumber } = context.properties();
    const { intent } = context.properties();
    // create moch order
    let clientOrder = creatOrder();
    // add the moch order to the list
    let orderList = addMochDataToTheArray(clientOrder);
    // find that moch order
    clientOrder = findSpecificOrderWithItsNumber(orderNumber, orderList);
    context.logger().info("hi there");
    // if exists
    if (clientOrder) {
      // message the user if it is out or not
      orderStateIntentInquiry(intent, clientOrder, context, done); // do this if orderIntent is inquiry
      // if update intent then take the order
      orderUpdateIntent(context);
      done();
    } else {
      done();
    }
  },
};

function prepareTheOrder(clientOrder) {
  const message = ` الأسم : ${clientOrder.clientName} \n العنوان : ${clientOrder.clientAddress} \n
 رقم التليفون :  ${clientOrder.clientPhoneNumber}\n
 الأوردر : ${clientOrder.order} \n
 رقم الأوردي : ${clientOrder.orderNumber}
 وقت عمل الأوردر : ${clientOrder.dateTime}
  `;
  return message;
}
function orderStateIntentInquiry(intent, clientOrder, context, done) {
  if (!intent === "orderStateInquiry") {
    return;
  }
  if (!clientOrder.wentOut) {
    context.reply("الأوردر خرج ي افندم");
  } else {
    context.reply("الأوردر لسه بيجهز يافندم");
  }
  done();
}
function creatOrder() {
  let clientOrder = {};
  clientOrder.clientName = "احمد";
  clientOrder.clientAddress = "القاهره";
  clientOrder.clientPhoneNumber = "01003057274";
  clientOrder.order = "3 فول";
  clientOrder.orderNumer = "15"; //let x = Math.floor((Math.random() * 100) + 1);
  clientOrder.dateTime = Date.now;
  clientOrder.wentOut = false;
  clientOrder.deliverd = false;
  return clientOrder;
}
function findSpecificOrderWithItsNumber(orderNumber, list) {
  return list.find((order) => order.orderNumer === orderNumber);
}
function addMochDataToTheArray(clientOrder) {
  let list = [];
  list.push(clientOrder);
  return list;
}
function orderUpdateIntent(context, done) {
  if (!intent === "UpdateOrder") {
    return;
  }
  if (clientOrder.wentOut) {
    context.reply("الاوردر خرج ي افندم لا يمكن التعديل");
    done();
  }
  context.reply(prepareTheOrder(clientOrder));
  context.transition("updateTheOrder");
  done();
}
