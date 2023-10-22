const util = {
  /**Convert hex to decimal for discord color */
  hexToDec(hex: string) {
    hex = hex.replaceAll("#", "")
    return parseInt(hex, 16)
  },
}

export default util
