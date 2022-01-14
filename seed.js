//SEED 
router.get('/seed', async (req, res) => {
  const newToons =
    [
      {
      class: "Fighter",
      name: "John Smith",
      description: "A valiant warrior of unmatched strength",
      img: "public/img/Male_Fighter.jpeg",
      str: 14,
      dex: 10,
      con: 17,
      int: 8,
      wis: 10,
      charm: 12
      }, {
      class: "Rogue",
      name: 'Dusty Bones',
      description: 'A shadowy figure with a stealthy approach',
      img: "public/img/Male_Rogue.webp",
      str: 12,
      dex: 18,
      con: 12,
      int: 8,
      wis: 10,
      charm: 16
      }, {
      class: "Sorcerer",
      name: 'Jaina Menethil',
      description: 'Sorceress Supreme, big attitude bigger spells',
      img: "public/img/Female_Sorcerer.jpeg",
      str: 6,
      dex: 9,
      con: 14,
      int: 8,
      wis: 12,
      charm: 17
      }
    ]

  try {
    const seedItems = await Toon.create(newToons)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})
