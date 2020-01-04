const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//Gets all members
router.get("/", (req, res) => res.json(members));

//Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  {
    found
      ? res.json(
          members.filter(member => member.id === parseInt(req.params.id))
        )
      : res
          .status(400)
          .json({ msg: `No member with id ${req.params.id} found!` });
  }
});

//Create new member
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.address || !newMember.email) {
    return res
      .status(400)
      .json({ msg: "Provide all information for name, address and email" });
  }
  members.push(newMember);
  // res.json(members);
  res.redirect("/api/members");

  //while working with real api we will have real database instead of file and we will do as follow for mongo db
  // members.save(newMember);
});

//Update existing member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  {
    if (found) {
      const updMember = req.body;

      members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
          member.name = updMember.name ? updMember.name : member.name;
          member.address = updMember.address
            ? updMember.address
            : member.address;
          member.email = updMember.email ? updMember.email : member.email;

          res.json({ msg: "Member updated", member });
        }
      });
    } else {
      res
        .status(400)
        .json({ msg: `No member with id ${req.params.id} found!` });
    }
  }
});

//Delete a member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  {
    found
      ? res.json({
          msg: `Member with id ${req.params.id} deleted!`,
          members: members.filter(
            member => member.id !== parseInt(req.params.id)
          )
        })
      : res
          .status(400)
          .json({ msg: `No member with id ${req.params.id} found!` });
  }
});

module.exports = router;
