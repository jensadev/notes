'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Notes',
            [
                {
                    note: 'pick up some bread after work',
                    tag: 'shopping',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    note: 'remember to write up meeting notes',
                    tag: 'work',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    note: 'learn how to use node orm',
                    tag: 'work',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Notes', null, {});
    }
};
