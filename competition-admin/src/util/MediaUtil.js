const fileType = ['png', 'jpeg', 'jpg'];

export default {
  getBase64: (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const { result } = reader;
      return callback(result);
    });
    if (img) {
      reader.readAsDataURL(img);
    }
  },

  validateFileType: (type) => {
    if (fileType.includes(type)) {
      return true;
    }
    return false;
  },
  isvalidURL: (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  },
};
