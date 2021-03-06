function buildMakeUser({ ObjectId }) {
    function validateUserId(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('User must have a valid id.');
        }
    }

    function validateFirstName(firstName) {
        if (!firstName) {
            throw new Error('User must enter a first name.');
        }
        if (typeof firstName !== 'string') {
            throw new Error('User must have a valid first name. (string!)');
        }
        if (firstName.length <= 2 || firstName.length >= 20) {
            throw new Error('User\'s first name must be longer than 2 characters and shorter than 20.');
        }
    }

    function validateLastName(lastName) {
        if (!lastName) {
            throw new Error('User must enter a last name.');
        }
        if (typeof lastName !== 'string') {
            throw new Error('User must have a valid last name. (string!)');
        }
        if (lastName.length <= 2 || lastName.length >= 20) {
            throw new Error('User\'s last name must be longer than 2 characters and shorter than 20.');
        }
    }

    function validateEmail(email) {
        const validEmailScreenRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            throw new Error('User must enter an email address.');
        }
        if (typeof email !== 'string') {
            throw new Error('User must enter a valid email. (string!)');
        }
        email = email.toLowerCase();
        if (!validEmailScreenRegex.test(email)) {
            throw new Error('User must enter a valid email address.');
        }
    }

    function validatePassword(password) {
        if (!password) {
            throw new Error('User must enter a password.');
        }
        if (typeof password !== 'string') {
            throw new Error('User must enter a valid password. (string!)');
        }
        if (password.length <= 8) {
            throw new Error('Password must be at least 8 characters long.');
        }
    }

    return function makeUser({
        id = new ObjectId(),
        emailConfirmed = false,
        creationDate = Date.now(),
        lastModified = Date.now(),
        firstName,
        lastName,
        email,
        password,
    } = {}) {
        validateUserId(id);
        validateFirstName(firstName);
        validateLastName(lastName);
        validateEmail(email);
        validatePassword(password);

        return Object.freeze({
            getId: () => id,
            getEmailConfirmed: () => emailConfirmed,
            getCreationDate: () => creationDate,
            getLastModified: () => lastModified,
            getFirstName: () => firstName,
            getLastName: () => lastName,
            getEmail: () => email,
            getPassword: () => password,
        })
    };
}

module.exports = { buildMakeUser };