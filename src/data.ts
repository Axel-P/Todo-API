export default {
    users: [
        {
            id: "12345",
            firstname: "Alice",
            lastName: "Doe",
            email: "alice@email.com",
            password: "pAsSWoRd!",
            roles: ["admin"],
            permissions: ["read:any_account", "read:own_account"]
        },
        {
            id: "67890",
            firstname: "Bob",
            lastName: "doe",
            email: "bob@email.com",
            password: "password321",
            roles: ["subscriber"],
            permissions: ["read:own_account"]
        }
    ]
}