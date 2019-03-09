const fetch = require('node-fetch');

const challenge = async () => {
  try {
    const mockSnackerRes = await fetch("https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json")
    const mockSnackers = await mockSnackerRes.json();

    const productRes = await fetch("https://ca.desknibbles.com/products.json?limit=250")
    const productResJson = await productRes.json();

    const stockedSnacksUnderFave = []
    const emails = []
    let totalPrice = 0

    productResJson.products.forEach(product => {
      mockSnackers.forEach(snacker => {
        if (product.title === snacker.fave_snack) {
          emails.push(snacker.email)
          totalPrice += Number(product.variants[0].price)
          if (!stockedSnacksUnderFave.includes(product)) {
            stockedSnacksUnderFave.push(product)
          }
        }
      })
    })

    console.log(emails)
    console.log(stockedSnacksUnderFave)
    console.log(totalPrice)
    
  } catch (e) {
    console.log(e)
  }
}

challenge()