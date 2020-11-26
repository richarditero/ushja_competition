const fileType = ['png', 'jpeg', 'jpg'];

export const MediaUtil = {
  getBase64: (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      let result = reader.result;
      return callback(result);
    });
    if (img) {
      reader.readAsDataURL(img);
    }
  },

  validateFileType: type => {
    if (fileType.includes(type)) {
      return true;
    }
    return false;
  }
};
