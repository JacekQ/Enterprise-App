var faker = require('faker');
faker.locale = 'pl';

const roles = ['ROLE_USER', 'ROLE_ADMIN'];
const countries = ['England', 'Poland', 'USA'];

var database = { users: [], customers: [], contacts: [], products: [] };

for (var i = 1; i <= 100; i++) {
    if (i <= 10) {
        database.users.push({
            id: i,
            email: faker.internet.email().toLowerCase(),
            image: faker.image.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
            role: [{ name: roles[Math.floor(Math.random() * roles.length)], userPermissions: [] }],
            username: faker.internet.userName()
        });
    } else {
        database.users[0] = {
            ...database.users[0],
            email: 'admin@test.com',
            password: '123456',
            role: [{ name: 'ROLE_ADMIN', userPermissions: [] }],
            username: 'quyek'
        };
        database.users[1] = {
            ...database.users[1],
            email: 'user@test.com',
            password: '123456',
            role: [{ name: 'ROLE_USER', userPermissions: [] }],
            username: 'quyek2'
        };
    }

    if (i <= 20) {
        database.customers.push({
            id: i,
            companyName: faker.company.companyName(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: countries[Math.floor(Math.random() * countries.length)],
            email: faker.internet.email().toLowerCase(),
            phone: faker.phone.phoneNumber(),
            createdAt: faker.date.between('2000-01-01', '2010-12-31')
        });
    }

    database.contacts.push({
        id: i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.phoneNumber(),
        companyId: Math.max(Math.floor(Math.random() * 21), 1),
        title: faker.name.title()
    });

    database.products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      currencyName: faker.finance.currencyName(),
      product: faker.commerce.product(),
      productMaterial: faker.commerce.productMaterial(),
      image: faker.image.image(),
      imageData: faker.image.dataUri()
    });
}

console.log(JSON.stringify(database));
