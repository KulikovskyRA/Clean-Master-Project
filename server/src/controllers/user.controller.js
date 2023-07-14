const { User } = require('../../db/models');

module.exports.edit = async (req, res) => {
  const { userName, phoneNumber, email } = req.body.values;
  //const id = req.params;
  try {
    const updateUser = await User.update({ userName, phoneNumber, email }, {
      where: {
        id: req.body.id
      }
    });
    const sessionUser = { email, name: userName, id: req.body.id, phoneNumber };
    req.session.user = sessionUser;
    res
      .status(200)
      .json({ user: sessionUser });
    console.log(updateUser);
  } catch (error) {
    console.log(error);
  }
};
