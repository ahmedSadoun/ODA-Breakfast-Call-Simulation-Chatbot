"use strict";

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  metadata: () => ({
    name: "confirmService",
    properties: {
      clientName: { required: true, type: "string" },
      clientAddress: { required: true, type: "string" },
      clientPhoneNumber: { required: true, type: "int" },
      order: { required: true, type: "string" },
    },
    supportedActions: ["printConfirmation"],
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context
   */
  invoke: async (context, done) => {
    // Retrieve the value of the 'human' component property.
    const { clientName } = context.properties();
    const { clientAddress } = context.properties();
    const { clientPhoneNumber } = context.properties();
    const { order } = context.properties();
    // Determine the current date
    const clientOrder = {};
    clientOrder.clientName = clientName;
    clientOrder.clientAddress = clientAddress;
    clientOrder.clientPhoneNumber = clientPhoneNumber;
    clientOrder.order = order;
    clientOrder.orderNumer = Math.floor(Math.random() * 100 + 1); //let x = Math.floor((Math.random() * 100) + 1);
    clientOrder.dateTime = Date.now;
    clientOrder.wentOut = false;
    clientOrder.deliverd = false;
    const orderNumer = clientOrder.orderNumer;
    context.logger().info("hi there");
    context.setVariable("orderNumber", orderNumer.toString());
    context.transition("printConfirmation");
    done();
  },
};
