const Item = require('../models/item.js')
const { sendSms } = require('../utils/twilio');

module.exports = class itemService {
    
    static async create({ cost }) {
        const item = await Item.insert({ cost });
        await sendSms(
            process.env.ITEM_HANDLER_NUMBER,
            `New purchase will cost you ${cost}`
        );
        return item
    }

    static async getAll(){
        const items = await Item.getAll();
        return items;
    }

    static async getByID(id) {
        const item = await Item.getByID(id);
        return item;
    }

    static async updateById(id, { cost }) {
        const item = await Item.update({ id, cost });
        await sendSms(
          process.env.ITEM_HANDLER_NUMBER,
          `Purchase ${id} will now cost you ${cost}`
        );
    
        return item;
    }

    static async deleteById(id) {
        const item = await Item.delete(id);
    
        await sendSms(
          process.env.ITEM_HANDLER_NUMBER,
          `Good news! Purchase ${id} was removed, no longer costing you money!`
        );
    
        return item;
      }
}