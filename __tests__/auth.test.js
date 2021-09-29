import { verifyToken, createToken, hashPassword, comparePassword } from "../helpers/auth";

test('It should verify token', () => {
    const userObject = {
        userId: '6156b905fedf75fea990775d',
        firstName: 'Erik',
        lastName: 'Bostrm',
        email: 'erikbostrom1@gmail.com',
    }

    const token = createToken(userObject);
    expect(verifyToken(token)).toEqual(
        expect.objectContaining({
            userId: userObject.userId,
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            email: userObject.email,
            exp: expect.any(Number),
            iat: expect.any(Number)
        })
    );
});

test('It should verfy password', async () => {
    const password = 'myStrongPassword123#!"#';
    const hashedPassword = await hashPassword(password);
    const login = await comparePassword(password, hashedPassword);
    expect(login).toBe(true);
});

