const Petition = require("../models/Petition");

exports.createPetition = (req, res) => {
  const { title, content } = req.body;
  const petitionerId = req.user.id;

  const query = `INSERT INTO petitions (title, content, petitionerId) VALUES (?, ?, ?)`;

  db.run(query, [title, content, petitionerId], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: "Petition created successfully", id: this.lastID });
  });
};


exports.getPetitions = (req, res) => {
  const query = `SELECT p.*, u.email AS petitionerEmail FROM petitions p JOIN users u ON p.petitionerId = u.id`;

  db.all(query, [], (err, petitions) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(petitions);
  });
};

exports.signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);
    if (!petition) return res.status(404).json({ error: "Petition not found" });

    if (petition.signatures.includes(req.user.id)) {
      return res.status(400).json({ error: "You have already signed this petition" });
    }

    petition.signatures.push(req.user.id);
    await petition.save();
    res.json({ message: "Petition signed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
