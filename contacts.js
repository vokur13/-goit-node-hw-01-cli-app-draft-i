import { promises as fs } from 'fs';
import { resolve } from 'path';
import { uid } from 'uid';

const contactsPath = resolve('db/contacts.json');

export async function listContacts() {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const filteredList = await data.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredList));
    const newList = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    console.log(newList);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const contactByID = await data.find((item) => item.id === contactId);
    console.log(contactByID);
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const newContact = { id: uid(), name, email, phone };
    const newList = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    const newData = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    console.log(newData);
  } catch (error) {
    console.log(error.message);
  }
}
