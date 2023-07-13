const { User } = require('../../db/models');

module.exports.edit = async (req, res) => {
  const { userName, phoneNumber, email } = req.body;
  const id = req.params;
  const updateUser = await User.update({ lastName: "Doe" }, {
    where: {
      lastName: null
    }
  });
};
