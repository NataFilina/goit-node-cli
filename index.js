const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const Contacts = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await Contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const contact = await Contacts.getContactById(id);
      return contact;

    case "add":
      const createContact = await Contacts.addContact(name, email, phone);
      return createContact;

    case "remove":
      const remove = await Contacts.removeContact(id);
      return remove;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options).then(console.log).catch(console.error);
