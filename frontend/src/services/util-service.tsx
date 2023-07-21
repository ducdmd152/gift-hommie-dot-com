export default {
  HEADER_HEIGHT: "100px",
  getCurrentUser() {
    const userJSON = localStorage.getItem("USER");
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }
    return USER;
  },
  logout() {
    localStorage.removeItem("USER");
  },
  getURLImageFromFile(file: File | null) {
    if (file == null)
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    return URL.createObjectURL(file);
  },
  getURLImageUploadPresent() {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  },
  getProductSampleImage() {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  },
  hashBySHA256(id: number | string) {
    // let message = id.toString();
    // const myBitArray = sjcl.hash.sha256.hash(message);
    // const myHash = sjcl.codec.hex.fromBits(myBitArray);
    // return myHash;
  },
  isOver30DaysFromToday(orderTime: Date | null) {
    if (orderTime === null) return false;
    const today = new Date();
    const timeDifferenceInMilliseconds = today.getTime() - orderTime.getTime();
    const daysDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

    return daysDifference > 30;
  },
  fconvertStringToDate(dateString: string): Date | null {
    const datePattern = /^(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(datePattern);

    if (!match) {
      console.error("Invalid date string format");
      return null;
    }

    const [, hours, minutes, day, month, year] = match;
    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    const dateObject = new Date(formattedDateString);

    return dateObject;
  },
};
