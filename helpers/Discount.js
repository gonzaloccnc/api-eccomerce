const PriceDiscont = ({ category, price }) => {
  switch (category) {
    case 'computers': {
      return price - price * 0.2
    }
    case 'tablets': {
      return price - price * 0.25
    }
    case 'drones & cameras': {
      return price - price * 0.3
    }
    case 'headphones': {
      return price - price * 0.18
    }
    case 'speakers': {
      return price - price * 0.24
    }
    case 'phones': {
      return price - price * 0.34
    }
    case 'TV & Home Cinema': {
      return price - price * 0.15
    }
    case 'Wearable Tech': {
      return price - price * 0.27
    }
    default: {
      return price
    }
  }
}

export default PriceDiscont
